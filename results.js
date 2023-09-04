
export default class Results {
    // dependency injection - to funguje. get_job_events je funkce definovana jinde a predava se jako parametr. 
    // definovana jinde je proto, ze vyuziva promenne z jineho kontextu, ktere zde nejsou k dispozici. 
    constructor(el, get_job_events) {
      this.get_job_events = get_job_events;  
      this.el = $(el);
      return this;  
    }
  
    append(result) {
        this.el.append(result)
    }
    
    async asyncAdd(result) {   
        console.log("asyncAdd()");   
        const new_div = await this.asyncCreateDiv(result); 
        const old_div = $('#'+result['id']);
        if (old_div.length) { 
            old_div.replaceWith(new_div); // Pokud div existuje, replace               
        } else {
            this.el.append(new_div);  // neexistuje, vytvorime novy.
        }
    }
  
    async asyncUpdate(jobs_array) {      
        console.log("asyncUpdate()");
        // tady by nastaval problem s hodnotou this. Uvnitr callback funkce neni this definovane.
        // Lze to obejit tak, ze se pouzije arrow function.
        // nebo se to obejde tak, ze se pouzije bind(this) na konci forEach.
        // https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
        // nebo se this priradi do nejake promenne, ktera se pak pouzije uvnitr callbacku.
        // pro tu promennou plati pravidla lexikalniho scope.
        // vybral jsem si arrow function, i kdyz postup s promennou by byl nazornejsi.
        // Mam vic results, postupne na kazdy chci uplatnit nejaky modifikace. 
        // Tzn. tady updatuju postupne vsechny divy, odpovidajici vysledkum z jobs_array.        
        jobs_array['results'].forEach(async (result, index) => {
            let new_div = await this.asyncCreateDiv(result); // this je zde definovane, protoze je to arrow function, melo by mit hodnotu z outer scope.
            
            const old_div = $('#'+result['id']);
            if (old_div.length) { // div existuje, replace
                old_div.replaceWith(new_div);                
            } else {
                this.el.append(new_div); // neexistuje, vytvorime novy. (muze to vubec nastat, kdyz delam update?)
            }
        });
    }
    
    processJobErrorEvents(data, result) {
        console.log("processJobEvents(data)");
        console.log("--- data ---");
        console.log(data);

        let error = "";
        // posilaji se sem results, ktere jsou vysledkem eventu runner_on_failed, NEBO runner_item_on_failed.
        // proto se tady musi rozlisit dve situace. Lepsi reseni zatim nemam. 
        // Ale podle events.py to vypada, ze po runner_item_on_failed jeste je runner_on_failed. NEBO NE? 
                     
        // tohle je i v eventu runner_on_failed, v pripade, ze mel vice items, tak v ['res']['results'] je pole s vysledky.
        // takze to znamena, ze runner_on_item_failed nepotrebuju.         
        // nejak mi tady chybi vysledky asserts. Priklad v 
        /*
        if (data['results'][0]['event_data']['res']['assertion'])
        {
          error += "<b>msg: </b>" + data['results'][0]['event_data']['res']['msg'];
        }
        */

        // Tohle je kravina, napriklad v pripade, ze tam mam ten assertion, nebo je tam nastaveno, ze 
        // nema zastavovat na chybach, tak potrebuju zkontrolovat vsechny results, nejen ten prvni. 
        data['results'].forEach(function (item, index) {            
            console.log("item");
            console.log(item['event_data']['res']);

            if (item['event_data']['res']['results'] != null ){
                console.log("multiple results");
                item['event_data']['res']['results'].forEach(function (item, index) {
                    if (item['failed'] == true) {   // Polozek muze byt vic, zajimaji me jen ty failnute. 
                        if (item['assertion']) {
                            error += "<b>assertion: </b>" + item['msg'] + "<br>";                            
                        }
                        if (item['msg']) {
                            error += "<b>msg: </b>" + item['msg'] + "<br>";
                        }
                        if (item['stderr']) {
                            error += "<b>stderr: </b>" + item['stderr'] + "<br>";
                        }
                        if (item['stdout']) {
                            error += "<b>stdout: </b>" + item['stdout'] + "<br>";
                        }
                    }
                });
            } else { 
                // v pripade, kdy mam dva resulty, kdy jeden je failed: false a druhy failed: true, zobrazily by se tam dve msg, od kazdeho
                // resultu jedna. To je spatne, protoze chci zobrazit jen tu failed.
                // Navic je to matouci, protoze se vysledky dvou eventu zobrazuji v jednom divu.
                // Musi se proto rozlistit opet zda item['failed'] == true.
                console.log("NEJSOU multiple results");
                if (item['failed'] == true) {   // Polozek muze byt vic, zajimaji me jen ty failnute.                
                    if (item['assertion']) {
                        error += "<b>assertion: </b>" + item['msg'] + "<br>";
                    }
                    if (item['event_data']['res']['msg']) {
                        error += "<b>msg: </b>" + item['event_data']['res']['msg'];
                    }
                    if (item['event_data']['res']['stderr']) {
                        error +=  "<br>" + "<b>stderr: </b>" +item['event_data']['res']['stderr'];
                    }
                    if (item['event_data']['res']['stdout']) {
                        error += "<br>" + "<b>stdout: </b>" +item['event_data']['res']['stdout'] + "<br>";
                    }
                }
            }

        });


        const host = data['results'][0]['event_data']['host'];
      
        const msg = "Task <b>" + result['name'] + "</b> " + result['status'] + "<br>" +
                   result['description'] + "<br>" +
                   "<b>host</b>: " + host + "<br>" + 
                   error;  
                  //  "<b>error</b>: " + error;                                                 
                    
        const new_div = '<div id="'+ result['id'] + '" class="alert alert-danger" role="alert"><i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i>  '+ msg + '</div>';
        
        // (Tohle uz je zbytecne???)
        // jeste by tam mela byt kontrola, pokud workflow job failnul, tak udelat jeste kontrolu
        // na posledni provedeny job. Kdyz bude id stejne, jako to v poslednim divu, tak se tim muze opravit to,
        // ze tam nekdy zustane running a nezmeni se to na failed.
        //new_div = '<div id="'+ result['id'] + '" class="alert alert-danger" role="alert"><i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i>  Job <b>' + result['name'] + '</b> ' + result['status']   + '</div>';
        //<div class=\"alert alert-warning\" role=\"alert\"><i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i>    " + msg + "</div>"       
        return new_div;
    }



    async asyncCreateDiv(result) {
        console.log("asyncCreateDiv()");
        let new_div = "";     
        let msg = "";
        // Classy rotujicich sipek se v kaze major verzi fontawesome jmenuji jinak. Je potreba na to pamatovat pri pripadnem updatu FA. 
        switch(result['status']) {
            case 'pending':  // ceka na dokonceni jineho jobu, ktery je soucasti workflow. I kdyz nemusi byt explicitni
                           // muze to byt treba source control job.  
                new_div = '<div id="'+ result['id'] + '" class="alert alert-warning" role="alert"> <i class="fas fa-sync-alt fa-spin" aria-hidden="true"></i> Job <b>' + result['name'] + '</b> is ' + result['status'] + '</div>';                                        
                break;
            case 'waiting':  // job je v queue, ale jeste nebyl spusten. Vetsinou to nakratko vzdy nastane. 
                new_div = '<div id="'+ result['id'] + '" class="alert alert-warning" role="alert"> <i class="fas fa-sync-alt fa-spin" aria-hidden="true"></i> Job <b>' + result['name'] + '</b> is ' + result['status'] + '</div>';                                        
                break;    
            case 'running':
                new_div = '<div id="'+ result['id'] + '" class="alert alert-primary" role="alert"> <i class="fas fa-sync-alt fa-spin" aria-hidden="true"></i> Job <b>' + result['name'] + '</b> is ' + result['status'] + '</div>';                                        
                break;                                        
            case 'successful':
                new_div = '<div id="'+ result['id'] + '" class="alert alert-success" role="alert"> <i class="fa fa-check" aria-hidden="true"></i> Job <b>' + result['name'] + '</b> is ' + result['status'] + '</div>'
                break;
            case 'failed':                
                // FIXME: Pokud to failne z duvodu, ze failnul predchozi job, pak job_events budou prazdny. To jeste
                // je potreba osetrit. Predchozi job muze failnout proto, ze je to treba source control job, ktery neni primo 
                // soucasti workflow, ale je to explicitne vynucene u daneho jobu.                                                     
                const data = await this.get_job_events(result['id']);                            
                new_div = this.processJobErrorEvents(data, result); // oddeleno kvuli testovani  
                // jenze tady se klidne muze stat, ze tam tech failnutych jobu bude vic. 
                // a pak se to bude spatne zobrazovat, protoze identifikator divu je id jobu. 
                // nastava to ale jen tehdy, kdyz mam u jobu ignorovat failnuti. Pak treba chci, aby se zobrazilo
                // jen to posledni failnuti, ted se mi zobrazuje prvni. Nebo chci, aby se ty job_eventy, ktere maji status 
                // failed: false, nezobrazovaly vubec. Nebo by se taky mohlo udelat to, ze se 
                break;             
            default: // v pripade, ze je tam neco, co necekam, konstruuju defaultni div s nejakym vyraznym odlisenim.
                console.log(result['status'])
                new_div = '<div id="'+ result['id'] + '" class="alert alert-danger" role="alert"> <i class="fa fa-heartbeat" aria-hidden="true"></i> Job <b>' + result['name'] + '</b> is ' + result['status'] + '</div>'
                break;
                //case 'revoked':                    
                //"<div class=\"alert alert-primary\" role=\"alert\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i>   " + msg + "</div>")
        } // switch
        return new_div;  
    }
    
  }