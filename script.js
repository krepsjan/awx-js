// ====================================================================
// Pool over inner job results. Print results into web page of the caller 
// Loosely inspired by tower-cli --monitor

// Pooling API is done by recursion with timeout.


const tower_token_write = "3TraN87FYYLfztasEjhg0IYbDLWAno";

const tower_api_host = "awx.ciirc.cvut.cz";
const tower_api_url = "https://"+ tower_api_host + "/api/v2/";
const timeout = 500; // timeout v ms
const workflow_job = '9'  // 13/25  - 8/9 na novem serveru. 
const debug = true
    
import Results from './results.js'; 



// vykreslovani do DOM chci pouze pres tuto classu, reprezentujici div results. 
// Pozor na to, ze div id=results vytvari globalni promennou results, takze by to jmeno neslo pouzit. 
const results = new Results('#myresults', get_job_events);


// FIXME: funguje to v pripade erroru spravne, ale nekdy to nevypise tu chybu a skonci to jen 
// s hlaskou, ze workflow job selhal. To se mi nelibi. Ani to nevypise ten counter last_count1, kterym se kontroluje
// zda se zvysil pocet clenu v jobs_array. 
// 1. bud to probehne tak rychle, ze se counter nestaci zvysit
// 2. nebo ... co?
// je potreba pridat dalsi ladici hlasky, aby byl videt lepe ten workflow scriptu. Nebo nejaky debug.

// Seznam nodu ve workflow mohu ziskat takto:
// http://localhost:30080/api/v2/workflow_job_templates/13/workflow_nodes/


// http://localhost:30080//api/v2/jobs/732/ mam v tom poli vracenych 
// bezicich jobu.
// ten uz ma result_traceback, ktery je tam v okamziku, kdy to failne nejak necekane. Takze, pri failu instalace baliku, ktery neexistuje je to prazdne. 

// Kdyz to skonci s     "result_traceback": "Error streaming stdin to pod awx/automation-job-732-nk7gb. Error: error dialing backend: x509: certificate is valid for 127.0.0.1, 10.35.125.182, not 10.37.3.20",
// napr. takto, tak potom neni nic zase ve stdout.  Tohle je totiz chyba z k3s, nikoli z ansible.
// name": "use_set_stats", - budu potrebovat
// 
// Asi to jde zjistit takto:
// https://docs.ansible.com/ansible-tower/latest/html/towerapi/api_ref.html#/Jobs/Jobs_jobs_list
// job_explanation: 
//    A status field to indicate the state of the job if it wasn’t able to run and capture stdout (string)
// To bych v takovych pripadech mohl pouzit. 

// "status": "error",
// "failed": true,     -- to taky budu potrebovat, protoze to jsou ty stavy, kdy me to zajima.

// zjisti vsechny joby spustene jobem <id> a zjisti jejich stav.
// Tohle se vola opakovane, pricemz mezi jednotlivymi volanimi muze a nemusi 
// v jobs_array nic pribyt. 

    async function get_job_events(job_id) {
        // API volani, aby se zjistily podrobnosti, zejmena error message.
        // TODO: pridat try/catch.
        // vyhodit do nove funkce, ktrea bude vracet ten zaznam data.  
        // Pozor, tady ten filter ?event__contains=runner_item_on_failed
        // Pokud task obsahuje smycku, tak chyba bude v runner_item_on_failed,
        // v runner_on_failed bude jen "One or more items failed"
        
        // ta chyba je v eventu runner_on_failed. Vypada to, ze by tam slo dat jen to runner_on_failed,
        // ale musim presne zjistit, jaky je v tom rozdil. 
        // runner_item_on_failed
        
        //const response = await fetch(tower_api_url + "jobs/" + job_id + "/job_events/?event__contains=runner_on_failed", {
        const response = await fetch(tower_api_url + "jobs/" + job_id + "/job_events/?or__event__contains=runner_on_failed&or__event__contains=runner_items_on_failed", {            
            method: 'get',
            headers: {
                "Authorization": "Bearer " + tower_token_write,
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        return data;
}

    // ===============================================================================                
    // Pokud se chci vyhnout globalni promenne, potrebuju callback s closurou, ktera 
    // zapouzdri last_count.
    // Tento callback trackuje ty zmeny a vypisuje pripadne vysledky
    const handleDataCallback = () => {    
        let last_count = 0;
        let last_status = "";
    
        return async (jobs_array) => {
//            console.log("handleDataCallback: last_count = ", last_count)
            let new_div = "";
            if (jobs_array['count'] == 0) {
                return;
            }
            // nejprve zjistit, zda status vubec existuje. 
            // script.js:137 Uncaught TypeError: Cannot read properties of undefined (reading 'status')
            /*
            if (jobs_array['results'][last_count - 1]['status'] === 'undefined') {
                  debugger;
            }
            */

            // tohle se provede jen obcas
            if (jobs_array['count'] > last_count) {
            
                const result = jobs_array['results'][last_count];
                // na konstrukci noveho divu pouzit ten switch. 
                // na zacatku by asi mel byt vzdy pending? Nemusi byt, kdyz nebude cekat na nejaky ten source control update. 
                // asi tady ten switch bude potreba pro jistotu taky. 
                await results.asyncAdd(result);
                await results.asyncUpdate(jobs_array);

                last_count++;
                last_status = result['status'];
            } 
            // Tohle je opraveny? 
            // chyba nastava kvuli tomu, ze pole jobs_array ma napr. count 5, a last_count je taky 5
            // Ale delka pole results je pouze 4 - tedy indexy jdou jen od 0 do 3. A ja se ptam na lastcount - 1, coz je 4.
            // Takovy index v poli results neexistuje.
            // {count: 5, next: null, previous: null, results: Array(4)}
            // The count field indicates the total number of unified jobs found for the given query.
            // Tak proc to nekdy funguje a nekdy ne. Ten pripad kdy to nefunguje se vyskytne jen obcas.
            // Vypada to, ze k tomu dochazi, kdyz tam soucasne bezi vice jobu, pripadne jeden z nich je pending, nebo waiting. 

            // Priklad http://localhost:30080/api/v2/unified_jobs/?unified_job_node__workflow_job=2326&order_by=finished&status__in=successful,failed,error
            // da count 5. 
            // FIXME, kdy udelam cancel jobu, ktery bezi, tak to tady skonci 
            // FIXME!!!! Nemohu kontrolovat jen posledni status posledniho jobu, musim kontrolovat status vsech jobu a jeho zmeny. 
            // Viz poznamky v debug.org. 
            // CILI tady mohou nastat i jine pripady. Napriklad, ze se pocet jobu nezvysi, ale status se zmeni, NEBO se soucasne zvysi pocet jobu, ale nejakemu z puvodnich 
            // se zmeni status. TO JE DULEZITE. MUZE SE STAT, ZE SE ZMENI STATUS NEJAKEHO JOBU, KTERY UZ V POLI JE.
            else if (jobs_array['results'][last_count - 1]['status'] != last_status) { // tady je obcas error script.js:151 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'status')
                //debugger;
                const result = jobs_array['results'][last_count - 1];            
                await results.asyncAdd(result);
                await results.asyncUpdate(jobs_array);


            }  // status != last_status
            else {
                console.log("counter se nezvysil a status se nezmenil");                
               // debugger;
            }

            return last_count;  // tohle je vlastne uzavreny last_count1 v lexikalnim scope -- opravdu? A potrebuju tady opravdu return?
        }
    }
    


// ====================================================================
// Function is repeatedly called, until workflow_job is finished
// Array of jobs is gradually filled with jobs, which are part of workflow_job
// Passed callback handleData then checks, if there is new job in array, and if so 
// it process its data and prints it.

/*
    Mozna, ze ta chyba ve funkci <> je zpusobena tim, ze tady nezadam vsechny statusy, ktere existuji.
    running: Running
    pending: Pending
    successful: Successful
    failed: Failed
    error: Error

    new: New
    waiting: Waiting    
    canceled: 

    Kdyz to tam pridam, tak tam obcas probleskne ten waiting, protoze je to cerveny stav default, ale bezi to dal, snad bez chyby...?
*/
async function iterateWorkflowJobResults(id, handleData){
    const jobs_array = await $.ajax({
        url: tower_api_url + "unified_jobs/?unified_job_node__workflow_job=" + id + "&order_by=finished&status__in=running,pending,successful,failed,error,waiting",
        //url: tower_api_url + "unified_jobs/?unified_job_node__workflow_job=" + id + "&order_by=finished&status__in=successful,failed,error",        
        // Eg. http://localhost:30080/api/v2/unified_jobs/?unified_job_node__workflow_job=1503&order_by=finished&status__in=successful,failed,error
        type: 'get',
        headers: {
            "Authorization": "Bearer " + tower_token_write, 
            "Content-Type": "application/json",                
        },
        dataType: 'json'});
    
    handleData(jobs_array) // Call passed callback
} 

/*
http://localhost:30080/api/v2/jobs/90/stdout/?format=txt
take si mohu vracet artifacts

    "artifacts": {
        "integration_results_url": "https://file.io/h6mHl7RJ2mE7"
    },
"result_traceback": "",
*/



// ====================================================================
// Repeatedly pool the api for status of running workflow_job
// If status is running, check the status of inner workflow jobs. 
// ====================================================================
// TODO: Mel bych jeste udelat kontrolu pote, co se to dokonci, jestli tam nepribyl nejaky dalsi job, ktery jsem nechytil.
// Stacilo by asi, pridat za vnejsi volani poolWorkflowJob pridat jeste jedno volani iterateWorkflowJobResults(). 

async function asyncPoolWorkflowJob(workflow_job_id, handleData) {
    setTimeout(async function() {     
    
    const job = await $.ajax({               
        url: tower_api_url + "workflow_jobs/" + workflow_job_id + "/",  // ask for status of workflow_job
        type: 'get',
        headers: {            
            "Authorization": "Bearer " + tower_token_write, 
            "Content-Type": "application/json",                
        },
        dataType: 'json'});
        
    // If workflow_job is not in state failed or sucessfull,
    // keep fetching results of the jobs that it started at same interval. 
    // If it is not failed nor successful it is probably pending or running.
    if (!job['failed'] && job['status'] != "successful"){                  
        iterateWorkflowJobResults(workflow_job_id, handleData);   // iterate over running sub-jobs and show their status.
        await asyncPoolWorkflowJob(workflow_job_id, handleData);  // recurse. Timeout interval is global variable set at the beginning of this file.
    }
    else {
        // In case that workflow_job ended as failed or sucessful we stop pooling and update status.
        // koncime. Mel by se tady ale jeste udelat finalni update zobrazenych divu.   
        const msg = "Workflow job " + job['name'] + " status: " + job['status']                           
        
        // Pridame na konec vysledek a updatujeme i puvodni status nahore 
        if (job['status'] != 'successful') {
            $('#results').append('<div class="alert alert-warning" role="alert"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>    ' + msg + '</div>');
            $('#workflow_status').replaceWith('<div class="alert alert-warning" role="alert"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>    ' + msg + '</div>');
        }
        else {  // Pri successful jen nahradime puvodni status
            $('#workflow_status').replaceWith('<div class="alert alert-primary" role="alert"><i class="fa fa-check" aria-hidden="true"></i>   ' + msg + '</div>');
        }                
    }                    
    }, timeout);  // vnitrni/callback funce se spusti, az po vyprseni tohoto timeoutu
    console.log("asyncPoolWorkflowJob() - end"); 
    $("#fixmebutton").disabled = false; // enable button
}



// Entry function
// Global from the beginning of the script can be moved here. 
$(document).ready(function(){
    $("#testbutton").click(async function() {
        // tady se ocekava result jobu, ke kteremu se pak dotahuji jeho eventy, podle toho, zda 
        // je failed, nebo successful. takze takhle to zavolat nejde. 
        // Tedy tady bude vysledek volani
        // Job Detail - https://awx.ciirc.cvut.cz/api/v2/jobs/533/
        // a pokud bude v tomto result['status'] == 'failed', tak se zavola
        // Job Events - https://awx.ciirc.cvut.cz/api/v2/jobs/533/job_events/?event__contains=runner_on_failed
        // a z toho se pak zjisti, kde je ta chyba.
        // takze bych musel volat 
        // results.asyncCreateDiv(result) na Job Detail,
        // nebo jeste z asycnCreateDiv extrahovat tu logiku, ktera checkuje event__contains=runner_on_failed
        // coz by prispelo k prehlednosti kodu. 



        const result_events = {
            "count": 2,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 7180,
                    "type": "job_event",
                    "url": "/api/v2/job_events/7180/",
                    "related": {
                        "job": "/api/v2/jobs/533/",
                        "children": "/api/v2/job_events/7180/children/",
                        "host": "/api/v2/hosts/7/"
                    },
                    "summary_fields": {
                        "host": {
                            "id": 7,
                            "name": "docker-host",
                            "description": "imported"
                        },
                        "job": {
                            "id": 533,
                            "name": "check network",
                            "description": "Selhal test DNS resolvingu",
                            "status": "failed",
                            "failed": true,
                            "elapsed": 15.12,
                            "type": "job",
                            "job_template_id": 14,
                            "job_template_name": "check network"
                        },
                        "role": {}
                    },
                    "created": "2023-07-27T10:32:45.582753Z",
                    "modified": "2023-07-27T10:32:45.597369Z",
                    "job": 533,
                    "event": "runner_on_failed",
                    "counter": 9,
                    "event_display": "Host Failed",
                    "event_data": {
                        "playbook": "playbooks/check-network.yml",
                        "playbook_uuid": "2f62fcb1-843a-418f-8987-21499e70b840",
                        "play": "Check networking",
                        "play_uuid": "6a95b199-dcb9-b161-dfe3-000000000002",
                        "play_pattern": "docker-host",
                        "task": "ansible.builtin.shell",
                        "task_uuid": "6a95b199-dcb9-b161-dfe3-000000000004",
                        "task_action": "ansible.builtin.shell",
                        "resolved_action": "ansible.builtin.shell",
                        "task_args": "",
                        "task_path": "/runner/project/playbooks/check-network.yml:23",
                        "host": "docker-host",
                        "remote_addr": "docker-host",
                        "res": {
                            "changed": true,
                            "stdout": "Host bleblenikdenic.com not found: 3(NXDOMAIN)",
                            "stderr": "",
                            "rc": 1,
                            "cmd": "host bleblenikdenic.com",
                            "start": "2023-07-27 10:32:45.471249",
                            "end": "2023-07-27 10:32:45.505202",
                            "delta": "0:00:00.033953",
                            "msg": "non-zero return code",
                            "invocation": {
                                "module_args": {
                                    "_raw_params": "host bleblenikdenic.com",
                                    "_uses_shell": true,
                                    "stdin_add_newline": true,
                                    "strip_empty_ends": true,
                                    "argv": null,
                                    "chdir": null,
                                    "executable": null,
                                    "creates": null,
                                    "removes": null,
                                    "stdin": null
                                }
                            },
                            "stdout_lines": [
                                "Host bleblenikdenic.com not found: 3(NXDOMAIN)"
                            ],
                            "stderr_lines": [],
                            "_ansible_no_log": null
                        },
                        "start": "2023-07-27T10:32:44.534128+00:00",
                        "end": "2023-07-27T10:32:45.582385+00:00",
                        "duration": 1.048257,
                        "ignore_errors": true,
                        "event_loop": null,
                        "uuid": "52a0ecb5-d897-4af1-a313-dcda62243721",
                        "guid": "650d7940015848dab99c4cc30f571e7f"
                    },
                    "event_level": 3,
                    "failed": false,
                    "changed": true,
                    "uuid": "52a0ecb5-d897-4af1-a313-dcda62243721",
                    "parent_uuid": "6a95b199-dcb9-b161-dfe3-000000000004",
                    "host": 7,
                    "host_name": "docker-host",
                    "playbook": "playbooks/check-network.yml",
                    "play": "Check networking",
                    "task": "ansible.builtin.shell",
                    "role": "",
                    "stdout": "\u001b[0;31mfatal: [docker-host]: FAILED! => {\"changed\": true, \"cmd\": \"host bleblenikdenic.com\", \"delta\": \"0:00:00.033953\", \"end\": \"2023-07-27 10:32:45.505202\", \"msg\": \"non-zero return code\", \"rc\": 1, \"start\": \"2023-07-27 10:32:45.471249\", \"stderr\": \"\", \"stderr_lines\": [], \"stdout\": \"Host bleblenikdenic.com not found: 3(NXDOMAIN)\", \"stdout_lines\": [\"Host bleblenikdenic.com not found: 3(NXDOMAIN)\"]}\u001b[0m\r\n\u001b[0;36m...ignoring\u001b[0m",
                    "start_line": 8,
                    "end_line": 10,
                    "verbosity": 0
                },
                {
                    "id": 7182,
                    "type": "job_event",
                    "url": "/api/v2/job_events/7182/",
                    "related": {
                        "job": "/api/v2/jobs/533/",
                        "children": "/api/v2/job_events/7182/children/",
                        "host": "/api/v2/hosts/7/"
                    },
                    "summary_fields": {
                        "host": {
                            "id": 7,
                            "name": "docker-host",
                            "description": "imported"
                        },
                        "job": {
                            "id": 533,
                            "name": "check network",
                            "description": "Selhal test DNS resolvingu",
                            "status": "failed",
                            "failed": true,
                            "elapsed": 15.12,
                            "type": "job",
                            "job_template_id": 14,
                            "job_template_name": "check network"
                        },
                        "role": {}
                    },
                    "created": "2023-07-27T10:32:45.693595Z",
                    "modified": "2023-07-27T10:32:45.848094Z",
                    "job": 533,
                    "event": "runner_on_failed",
                    "counter": 12,
                    "event_display": "Host Failed",
                    "event_data": {
                        "playbook": "playbooks/check-network.yml",
                        "playbook_uuid": "2f62fcb1-843a-418f-8987-21499e70b840",
                        "play": "Check networking",
                        "play_uuid": "6a95b199-dcb9-b161-dfe3-000000000002",
                        "play_pattern": "docker-host",
                        "task": "ansible.builtin.assert",
                        "task_uuid": "6a95b199-dcb9-b161-dfe3-000000000005",
                        "task_action": "ansible.builtin.assert",
                        "resolved_action": "ansible.builtin.assert",
                        "task_args": "",
                        "task_path": "/runner/project/playbooks/check-network.yml:28",
                        "host": "docker-host",
                        "remote_addr": "docker-host",
                        "res": {
                            "_ansible_verbose_always": true,
                            "evaluated_to": false,
                            "assertion": "'not found:' not in cmd_result.stdout",
                            "msg": "Host nenalezen v DNS. Zkontrolujte DNS resolving. Host bleblenikdenic.com not found: 3(NXDOMAIN)",
                            "_ansible_no_log": null,
                            "changed": false
                        },
                        "start": "2023-07-27T10:32:45.637486+00:00",
                        "end": "2023-07-27T10:32:45.693170+00:00",
                        "duration": 0.055684,
                        "ignore_errors": null,
                        "event_loop": null,
                        "uuid": "7854c768-b9c4-4a1e-82d4-9ee9708955d3",
                        "guid": "650d7940015848dab99c4cc30f571e7f"
                    },
                    "event_level": 3,
                    "failed": true,
                    "changed": false,
                    "uuid": "7854c768-b9c4-4a1e-82d4-9ee9708955d3",
                    "parent_uuid": "6a95b199-dcb9-b161-dfe3-000000000005",
                    "host": 7,
                    "host_name": "docker-host",
                    "playbook": "playbooks/check-network.yml",
                    "play": "Check networking",
                    "task": "ansible.builtin.assert",
                    "role": "",
                    "stdout": "\u001b[0;31mfatal: [docker-host]: FAILED! => {\u001b[0m\r\n\u001b[0;31m    \"assertion\": \"'not found:' not in cmd_result.stdout\",\u001b[0m\r\n\u001b[0;31m    \"changed\": false,\u001b[0m\r\n\u001b[0;31m    \"evaluated_to\": false,\u001b[0m\r\n\u001b[0;31m    \"msg\": \"Host nenalezen v DNS. Zkontrolujte DNS resolving. Host bleblenikdenic.com not found: 3(NXDOMAIN)\"\u001b[0m\r\n\u001b[0;31m}\u001b[0m",
                    "start_line": 12,
                    "end_line": 18,
                    "verbosity": 0
                }
            ]
        }
        
        const testresult = {
    "id": 533,
    "type": "job",
    "url": "/api/v2/jobs/533/",
    "related": {
        "created_by": "/api/v2/users/1/",
        "labels": "/api/v2/jobs/533/labels/",
        "inventory": "/api/v2/inventories/4/",
        "project": "/api/v2/projects/10/",
        "organization": "/api/v2/organizations/1/",
        "credentials": "/api/v2/jobs/533/credentials/",
        "unified_job_template": "/api/v2/job_templates/14/",
        "stdout": "/api/v2/jobs/533/stdout/",
        "source_workflow_job": "/api/v2/workflow_jobs/532/",
        "execution_environment": "/api/v2/execution_environments/1/",
        "job_events": "/api/v2/jobs/533/job_events/",
        "job_host_summaries": "/api/v2/jobs/533/job_host_summaries/",
        "activity_stream": "/api/v2/jobs/533/activity_stream/",
        "notifications": "/api/v2/jobs/533/notifications/",
        "create_schedule": "/api/v2/jobs/533/create_schedule/",
        "job_template": "/api/v2/job_templates/14/",
        "cancel": "/api/v2/jobs/533/cancel/",
        "relaunch": "/api/v2/jobs/533/relaunch/"
    },
    "summary_fields": {
        "organization": {
            "id": 1,
            "name": "Default",
            "description": ""
        },
        "inventory": {
            "id": 4,
            "name": "Staging",
            "description": "",
            "has_active_failures": true,
            "total_hosts": 2,
            "hosts_with_active_failures": 1,
            "total_groups": 2,
            "has_inventory_sources": true,
            "total_inventory_sources": 2,
            "inventory_sources_with_failures": 0,
            "organization_id": 1,
            "kind": ""
        },
        "execution_environment": {
            "id": 1,
            "name": "AWX EE (latest)",
            "description": "",
            "image": "quay.io/ansible/awx-ee:latest"
        },
        "project": {
            "id": 10,
            "name": "SA-github",
            "description": "",
            "status": "successful",
            "scm_type": "git",
            "allow_override": true
        },
        "job_template": {
            "id": 14,
            "name": "check network",
            "description": "Selhal test DNS resolvingu"
        },
        "unified_job_template": {
            "id": 14,
            "name": "check network",
            "description": "Selhal test DNS resolvingu",
            "unified_job_type": "job"
        },
        "instance_group": {
            "id": 2,
            "name": "default",
            "is_container_group": false
        },
        "created_by": {
            "id": 1,
            "username": "admin",
            "first_name": "",
            "last_name": ""
        },
        "user_capabilities": {
            "delete": true,
            "start": true
        },
        "labels": {
            "count": 0,
            "results": []
        },
        "source_workflow_job": {
            "id": 532,
            "name": "fixme-workflow-test",
            "description": "",
            "status": "failed",
            "failed": true,
            "elapsed": 108.007
        },
        "ancestor_job": {
            "id": 532,
            "name": "fixme-workflow-test",
            "type": "workflow_job",
            "url": "/api/v2/workflow_jobs/532/"
        },
        "credentials": [
            {
                "id": 4,
                "name": "docker-host",
                "description": "",
                "kind": "ssh",
                "cloud": false
            }
        ]
    },
    "created": "2023-07-27T10:32:30.422920Z",
    "modified": "2023-07-27T10:32:31.021316Z",
    "name": "check network",
    "description": "Selhal test DNS resolvingu",
    "job_type": "run",
    "inventory": 4,
    "project": 10,
    "playbook": "playbooks/check-network.yml",
    "scm_branch": "",
    "forks": 0,
    "limit": "",
    "verbosity": 0,
    "extra_vars": "{}",
    "job_tags": "",
    "force_handlers": false,
    "skip_tags": "",
    "start_at_task": "",
    "timeout": 0,
    "use_fact_cache": false,
    "organization": 1,
    "unified_job_template": 14,
    "launch_type": "workflow",
    "status": "failed",
    "execution_environment": 1,
    "failed": true,
    "started": "2023-07-27T10:32:31.525565Z",
    "finished": "2023-07-27T10:32:46.645348Z",
    "canceled_on": null,
    "elapsed": 15.12,
    "job_args": "[\"podman\", \"run\", \"--rm\", \"--tty\", \"--interactive\", \"--workdir\", \"/runner/project\", \"-v\", \"/tmp/awx_533_qtb8rtfd/:/runner/:Z\", \"--env-file\", \"/tmp/awx_533_qtb8rtfd/artifacts/533/env.list\", \"--quiet\", \"--name\", \"ansible_runner_533\", \"--user=root\", \"--network\", \"slirp4netns:enable_ipv6=true\", \"quay.io/ansible/awx-ee:latest\", \"ansible-playbook\", \"-u\", \"root\", \"--ask-pass\", \"-i\", \"/runner/inventory/hosts\", \"-e\", \"@/runner/env/extravars\", \"playbooks/check-network.yml\"]",
    "job_cwd": "/runner/project",
    "job_env": {
        "ANSIBLE_UNSAFE_WRITES": "1",
        "AWX_ISOLATED_DATA_DIR": "/runner/artifacts/533",
        "ANSIBLE_FORCE_COLOR": "True",
        "ANSIBLE_HOST_KEY_CHECKING": "False",
        "ANSIBLE_INVENTORY_UNPARSED_FAILED": "True",
        "ANSIBLE_PARAMIKO_RECORD_HOST_KEYS": "False",
        "AWX_PRIVATE_DATA_DIR": "/tmp/awx_533_qtb8rtfd",
        "JOB_ID": "533",
        "INVENTORY_ID": "4",
        "PROJECT_REVISION": "35e4e299591d4e53583fc9d2222691b67ca9e9a1",
        "ANSIBLE_RETRY_FILES_ENABLED": "False",
        "MAX_EVENT_RES": "700000",
        "AWX_HOST": "https://towerhost",
        "ANSIBLE_SSH_CONTROL_PATH_DIR": "/runner/cp",
        "ANSIBLE_COLLECTIONS_PATHS": "/runner/requirements_collections:~/.ansible/collections:/usr/share/ansible/collections",
        "ANSIBLE_ROLES_PATH": "/runner/requirements_roles:~/.ansible/roles:/usr/share/ansible/roles:/etc/ansible/roles",
        "ANSIBLE_CALLBACK_PLUGINS": "/runner/artifacts/533/callback",
        "ANSIBLE_STDOUT_CALLBACK": "awx_display",
        "RUNNER_OMIT_EVENTS": "False",
        "RUNNER_ONLY_FAILED_EVENTS": "False"
    },
    "job_explanation": "",
    "execution_node": "awx_1",
    "controller_node": "awx_1",
    "result_traceback": "",
    "event_processing_finished": true,
    "launched_by": {
        "id": 1,
        "name": "admin",
        "type": "user",
        "url": "/api/v2/users/1/"
    },
    "work_unit_id": "bDejcKRP",
    "job_template": 14,
    "passwords_needed_to_start": [],
    "allow_simultaneous": false,
    "artifacts": {},
    "scm_revision": "35e4e299591d4e53583fc9d2222691b67ca9e9a1",
    "instance_group": 2,
    "diff_mode": false,
    "job_slice_number": 0,
    "job_slice_count": 1,
    "webhook_service": "",
    "webhook_credential": null,
    "webhook_guid": "",
    "host_status_counts": {
        "failures": 1
    },
    "playbook_counts": {
        "play_count": 1,
        "task_count": 3
    },
    "custom_virtualenv": null
        }

        const testresult1 = {
            "count": 4,
            "next": null,
            "previous": null,
            "results": [
                {
                    "id": 666,
                    "type": "job",
                    "url": "/api/v2/jobs/666/",
                    "related": {
                        "created_by": "/api/v2/users/1/",
                        "labels": "/api/v2/jobs/666/labels/",
                        "inventory": "/api/v2/inventories/13/",
                        "project": "/api/v2/projects/10/",
                        "organization": "/api/v2/organizations/1/",
                        "credentials": "/api/v2/jobs/666/credentials/",
                        "unified_job_template": "/api/v2/job_templates/42/",
                        "stdout": "/api/v2/jobs/666/stdout/",
                        "source_workflow_job": "/api/v2/workflow_jobs/665/",
                        "execution_environment": "/api/v2/execution_environments/1/",
                        "job_events": "/api/v2/jobs/666/job_events/",
                        "job_host_summaries": "/api/v2/jobs/666/job_host_summaries/",
                        "activity_stream": "/api/v2/jobs/666/activity_stream/",
                        "notifications": "/api/v2/jobs/666/notifications/",
                        "create_schedule": "/api/v2/jobs/666/create_schedule/",
                        "job_template": "/api/v2/job_templates/42/",
                        "cancel": "/api/v2/jobs/666/cancel/",
                        "relaunch": "/api/v2/jobs/666/relaunch/"
                    },
                    "summary_fields": {
                        "organization": {
                            "id": 1,
                            "name": "Default",
                            "description": ""
                        },
                        "inventory": {
                            "id": 13,
                            "name": "Staging1",
                            "description": "",
                            "has_active_failures": false,
                            "total_hosts": 2,
                            "hosts_with_active_failures": 0,
                            "total_groups": 2,
                            "has_inventory_sources": true,
                            "total_inventory_sources": 1,
                            "inventory_sources_with_failures": 0,
                            "organization_id": 1,
                            "kind": ""
                        },
                        "execution_environment": {
                            "id": 1,
                            "name": "AWX EE (latest)",
                            "description": "",
                            "image": "quay.io/ansible/awx-ee:latest"
                        },
                        "project": {
                            "id": 10,
                            "name": "SA-github",
                            "description": "",
                            "status": "successful",
                            "scm_type": "git",
                            "allow_override": true
                        },
                        "job_template": {
                            "id": 42,
                            "name": "check-filesystem",
                            "description": ""
                        },
                        "unified_job_template": {
                            "id": 42,
                            "name": "check-filesystem",
                            "description": "",
                            "unified_job_type": "job"
                        },
                        "instance_group": {
                            "id": 2,
                            "name": "default",
                            "is_container_group": false
                        },
                        "created_by": {
                            "id": 1,
                            "username": "admin",
                            "first_name": "",
                            "last_name": ""
                        },
                        "user_capabilities": {
                            "delete": true,
                            "start": true
                        },
                        "labels": {
                            "count": 0,
                            "results": []
                        },
                        "source_workflow_job": {
                            "id": 665,
                            "name": "fixme-workflow-test",
                            "description": "",
                            "status": "failed",
                            "failed": true,
                            "elapsed": 140.225
                        },
                        "credentials": [
                            {
                                "id": 4,
                                "name": "docker-host",
                                "description": "",
                                "kind": "ssh",
                                "cloud": false
                            }
                        ]
                    },
                    "created": "2023-08-17T14:39:53.402540Z",
                    "modified": "2023-08-17T14:40:16.525817Z",
                    "name": "check-filesystem",
                    "description": "",
                    "unified_job_template": 42,
                    "launch_type": "workflow",
                    "status": "successful",
                    "execution_environment": 1,
                    "failed": false,
                    "started": "2023-08-17T14:40:16.914316Z",
                    "finished": "2023-08-17T14:40:34.517159Z",
                    "canceled_on": null,
                    "elapsed": 17.603,
                    "job_explanation": "",
                    "execution_node": "awx_1",
                    "controller_node": "awx_1",
                    "launched_by": {
                        "id": 1,
                        "name": "admin",
                        "type": "user",
                        "url": "/api/v2/users/1/"
                    },
                    "work_unit_id": "8ZeYt2UP",
                    "job_type": "run",
                    "inventory": 13,
                    "project": 10,
                    "playbook": "playbooks/check-filesystem.yml",
                    "scm_branch": "",
                    "forks": 0,
                    "limit": "",
                    "verbosity": 0,
                    "extra_vars": "{}",
                    "job_tags": "",
                    "force_handlers": false,
                    "skip_tags": "",
                    "start_at_task": "",
                    "timeout": 0,
                    "use_fact_cache": false,
                    "organization": 1,
                    "job_template": 42,
                    "passwords_needed_to_start": [],
                    "allow_simultaneous": false,
                    "artifacts": {},
                    "scm_revision": "cbdfb3f8fd83155696753432a2b934ae104a28ea",
                    "instance_group": 2,
                    "diff_mode": false,
                    "job_slice_number": 0,
                    "job_slice_count": 1,
                    "webhook_service": "",
                    "webhook_credential": null,
                    "webhook_guid": ""
                },
                {
                    "id": 669,
                    "type": "job",
                    "url": "/api/v2/jobs/669/",
                    "related": {
                        "created_by": "/api/v2/users/1/",
                        "labels": "/api/v2/jobs/669/labels/",
                        "inventory": "/api/v2/inventories/4/",
                        "project": "/api/v2/projects/10/",
                        "organization": "/api/v2/organizations/1/",
                        "credentials": "/api/v2/jobs/669/credentials/",
                        "unified_job_template": "/api/v2/job_templates/14/",
                        "stdout": "/api/v2/jobs/669/stdout/",
                        "source_workflow_job": "/api/v2/workflow_jobs/665/",
                        "execution_environment": "/api/v2/execution_environments/1/",
                        "job_events": "/api/v2/jobs/669/job_events/",
                        "job_host_summaries": "/api/v2/jobs/669/job_host_summaries/",
                        "activity_stream": "/api/v2/jobs/669/activity_stream/",
                        "notifications": "/api/v2/jobs/669/notifications/",
                        "create_schedule": "/api/v2/jobs/669/create_schedule/",
                        "job_template": "/api/v2/job_templates/14/",
                        "cancel": "/api/v2/jobs/669/cancel/",
                        "relaunch": "/api/v2/jobs/669/relaunch/"
                    },
                    "summary_fields": {
                        "organization": {
                            "id": 1,
                            "name": "Default",
                            "description": ""
                        },
                        "inventory": {
                            "id": 4,
                            "name": "Staging",
                            "description": "",
                            "has_active_failures": true,
                            "total_hosts": 2,
                            "hosts_with_active_failures": 2,
                            "total_groups": 2,
                            "has_inventory_sources": true,
                            "total_inventory_sources": 2,
                            "inventory_sources_with_failures": 0,
                            "organization_id": 1,
                            "kind": ""
                        },
                        "execution_environment": {
                            "id": 1,
                            "name": "AWX EE (latest)",
                            "description": "",
                            "image": "quay.io/ansible/awx-ee:latest"
                        },
                        "project": {
                            "id": 10,
                            "name": "SA-github",
                            "description": "",
                            "status": "successful",
                            "scm_type": "git",
                            "allow_override": true
                        },
                        "job_template": {
                            "id": 14,
                            "name": "check network",
                            "description": "Selhal test DNS resolvingu"
                        },
                        "unified_job_template": {
                            "id": 14,
                            "name": "check network",
                            "description": "Selhal test DNS resolvingu",
                            "unified_job_type": "job"
                        },
                        "instance_group": {
                            "id": 2,
                            "name": "default",
                            "is_container_group": false
                        },
                        "created_by": {
                            "id": 1,
                            "username": "admin",
                            "first_name": "",
                            "last_name": ""
                        },
                        "user_capabilities": {
                            "delete": true,
                            "start": true
                        },
                        "labels": {
                            "count": 0,
                            "results": []
                        },
                        "source_workflow_job": {
                            "id": 665,
                            "name": "fixme-workflow-test",
                            "description": "",
                            "status": "failed",
                            "failed": true,
                            "elapsed": 140.225
                        },
                        "credentials": [
                            {
                                "id": 4,
                                "name": "docker-host",
                                "description": "",
                                "kind": "ssh",
                                "cloud": false
                            }
                        ]
                    },
                    "created": "2023-08-17T14:40:35.617908Z",
                    "modified": "2023-08-17T14:40:36.128997Z",
                    "name": "check network",
                    "description": "Selhal test DNS resolvingu",
                    "unified_job_template": 14,
                    "launch_type": "workflow",
                    "status": "failed",
                    "execution_environment": 1,
                    "failed": true,
                    "started": "2023-08-17T14:40:36.410005Z",
                    "finished": "2023-08-17T14:40:52.897409Z",
                    "canceled_on": null,
                    "elapsed": 16.487,
                    "job_explanation": "",
                    "execution_node": "awx_1",
                    "controller_node": "awx_1",
                    "launched_by": {
                        "id": 1,
                        "name": "admin",
                        "type": "user",
                        "url": "/api/v2/users/1/"
                    },
                    "work_unit_id": "qcWLBMef",
                    "job_type": "run",
                    "inventory": 4,
                    "project": 10,
                    "playbook": "playbooks/check-network.yml",
                    "scm_branch": "",
                    "forks": 0,
                    "limit": "",
                    "verbosity": 0,
                    "extra_vars": "{}",
                    "job_tags": "",
                    "force_handlers": false,
                    "skip_tags": "",
                    "start_at_task": "",
                    "timeout": 0,
                    "use_fact_cache": false,
                    "organization": 1,
                    "job_template": 14,
                    "passwords_needed_to_start": [],
                    "allow_simultaneous": false,
                    "artifacts": {},
                    "scm_revision": "cbdfb3f8fd83155696753432a2b934ae104a28ea",
                    "instance_group": 2,
                    "diff_mode": false,
                    "job_slice_number": 0,
                    "job_slice_count": 1,
                    "webhook_service": "",
                    "webhook_credential": null,
                    "webhook_guid": ""
                },
                {
                    "id": 671,
                    "type": "job",
                    "url": "/api/v2/jobs/671/",
                    "related": {
                        "created_by": "/api/v2/users/1/",
                        "labels": "/api/v2/jobs/671/labels/",
                        "inventory": "/api/v2/inventories/4/",
                        "project": "/api/v2/projects/10/",
                        "organization": "/api/v2/organizations/1/",
                        "credentials": "/api/v2/jobs/671/credentials/",
                        "unified_job_template": "/api/v2/job_templates/15/",
                        "stdout": "/api/v2/jobs/671/stdout/",
                        "source_workflow_job": "/api/v2/workflow_jobs/665/",
                        "execution_environment": "/api/v2/execution_environments/1/",
                        "job_events": "/api/v2/jobs/671/job_events/",
                        "job_host_summaries": "/api/v2/jobs/671/job_host_summaries/",
                        "activity_stream": "/api/v2/jobs/671/activity_stream/",
                        "notifications": "/api/v2/jobs/671/notifications/",
                        "create_schedule": "/api/v2/jobs/671/create_schedule/",
                        "job_template": "/api/v2/job_templates/15/",
                        "cancel": "/api/v2/jobs/671/cancel/",
                        "relaunch": "/api/v2/jobs/671/relaunch/"
                    },
                    "summary_fields": {
                        "organization": {
                            "id": 1,
                            "name": "Default",
                            "description": ""
                        },
                        "inventory": {
                            "id": 4,
                            "name": "Staging",
                            "description": "",
                            "has_active_failures": true,
                            "total_hosts": 2,
                            "hosts_with_active_failures": 2,
                            "total_groups": 2,
                            "has_inventory_sources": true,
                            "total_inventory_sources": 2,
                            "inventory_sources_with_failures": 0,
                            "organization_id": 1,
                            "kind": ""
                        },
                        "execution_environment": {
                            "id": 1,
                            "name": "AWX EE (latest)",
                            "description": "",
                            "image": "quay.io/ansible/awx-ee:latest"
                        },
                        "project": {
                            "id": 10,
                            "name": "SA-github",
                            "description": "",
                            "status": "successful",
                            "scm_type": "git",
                            "allow_override": true
                        },
                        "job_template": {
                            "id": 15,
                            "name": "Install docker",
                            "description": "Obratte se na oddeleni systemove podpory Azure"
                        },
                        "unified_job_template": {
                            "id": 15,
                            "name": "Install docker",
                            "description": "Obratte se na oddeleni systemove podpory Azure",
                            "unified_job_type": "job"
                        },
                        "instance_group": {
                            "id": 2,
                            "name": "default",
                            "is_container_group": false
                        },
                        "created_by": {
                            "id": 1,
                            "username": "admin",
                            "first_name": "",
                            "last_name": ""
                        },
                        "user_capabilities": {
                            "delete": true,
                            "start": true
                        },
                        "labels": {
                            "count": 0,
                            "results": []
                        },
                        "source_workflow_job": {
                            "id": 665,
                            "name": "fixme-workflow-test",
                            "description": "",
                            "status": "failed",
                            "failed": true,
                            "elapsed": 140.225
                        },
                        "credentials": [
                            {
                                "id": 4,
                                "name": "docker-host",
                                "description": "",
                                "kind": "ssh",
                                "cloud": false
                            }
                        ]
                    },
                    "created": "2023-08-17T14:40:55.032484Z",
                    "modified": "2023-08-17T14:40:55.846753Z",
                    "name": "Install docker",
                    "description": "Obratte se na oddeleni systemove podpory Azure",
                    "unified_job_template": 15,
                    "launch_type": "workflow",
                    "status": "failed",
                    "execution_environment": 1,
                    "failed": true,
                    "started": "2023-08-17T14:40:56.411116Z",
                    "finished": "2023-08-17T14:41:38.442812Z",
                    "canceled_on": null,
                    "elapsed": 42.032,
                    "job_explanation": "",
                    "execution_node": "awx_1",
                    "controller_node": "awx_1",
                    "launched_by": {
                        "id": 1,
                        "name": "admin",
                        "type": "user",
                        "url": "/api/v2/users/1/"
                    },
                    "work_unit_id": "GoW7p4gP",
                    "job_type": "run",
                    "inventory": 4,
                    "project": 10,
                    "playbook": "playbooks/install-docker.yml",
                    "scm_branch": "",
                    "forks": 0,
                    "limit": "",
                    "verbosity": 2,
                    "extra_vars": "{}",
                    "job_tags": "",
                    "force_handlers": false,
                    "skip_tags": "",
                    "start_at_task": "",
                    "timeout": 0,
                    "use_fact_cache": false,
                    "organization": 1,
                    "job_template": 15,
                    "passwords_needed_to_start": [],
                    "allow_simultaneous": false,
                    "artifacts": {},
                    "scm_revision": "cbdfb3f8fd83155696753432a2b934ae104a28ea",
                    "instance_group": 2,
                    "diff_mode": false,
                    "job_slice_number": 0,
                    "job_slice_count": 1,
                    "webhook_service": "",
                    "webhook_credential": null,
                    "webhook_guid": ""
                },
                {
                    "id": 670,
                    "type": "job",
                    "url": "/api/v2/jobs/670/",
                    "related": {
                        "created_by": "/api/v2/users/1/",
                        "labels": "/api/v2/jobs/670/labels/",
                        "inventory": "/api/v2/inventories/13/",
                        "project": "/api/v2/projects/10/",
                        "organization": "/api/v2/organizations/1/",
                        "credentials": "/api/v2/jobs/670/credentials/",
                        "unified_job_template": "/api/v2/job_templates/43/",
                        "stdout": "/api/v2/jobs/670/stdout/",
                        "source_workflow_job": "/api/v2/workflow_jobs/665/",
                        "execution_environment": "/api/v2/execution_environments/1/",
                        "job_events": "/api/v2/jobs/670/job_events/",
                        "job_host_summaries": "/api/v2/jobs/670/job_host_summaries/",
                        "activity_stream": "/api/v2/jobs/670/activity_stream/",
                        "notifications": "/api/v2/jobs/670/notifications/",
                        "create_schedule": "/api/v2/jobs/670/create_schedule/",
                        "job_template": "/api/v2/job_templates/43/",
                        "cancel": "/api/v2/jobs/670/cancel/",
                        "relaunch": "/api/v2/jobs/670/relaunch/"
                    },
                    "summary_fields": {
                        "organization": {
                            "id": 1,
                            "name": "Default",
                            "description": ""
                        },
                        "inventory": {
                            "id": 13,
                            "name": "Staging1",
                            "description": "",
                            "has_active_failures": false,
                            "total_hosts": 2,
                            "hosts_with_active_failures": 0,
                            "total_groups": 2,
                            "has_inventory_sources": true,
                            "total_inventory_sources": 1,
                            "inventory_sources_with_failures": 0,
                            "organization_id": 1,
                            "kind": ""
                        },
                        "execution_environment": {
                            "id": 1,
                            "name": "AWX EE (latest)",
                            "description": "",
                            "image": "quay.io/ansible/awx-ee:latest"
                        },
                        "project": {
                            "id": 10,
                            "name": "SA-github",
                            "description": "",
                            "status": "successful",
                            "scm_type": "git",
                            "allow_override": true
                        },
                        "job_template": {
                            "id": 43,
                            "name": "install-podman",
                            "description": ""
                        },
                        "unified_job_template": {
                            "id": 43,
                            "name": "install-podman",
                            "description": "",
                            "unified_job_type": "job"
                        },
                        "instance_group": {
                            "id": 2,
                            "name": "default",
                            "is_container_group": false
                        },
                        "created_by": {
                            "id": 1,
                            "username": "admin",
                            "first_name": "",
                            "last_name": ""
                        },
                        "user_capabilities": {
                            "delete": true,
                            "start": true
                        },
                        "labels": {
                            "count": 0,
                            "results": []
                        },
                        "source_workflow_job": {
                            "id": 665,
                            "name": "fixme-workflow-test",
                            "description": "",
                            "status": "failed",
                            "failed": true,
                            "elapsed": 140.225
                        },
                        "credentials": [
                            {
                                "id": 4,
                                "name": "docker-host",
                                "description": "",
                                "kind": "ssh",
                                "cloud": false
                            }
                        ]
                    },
                    "created": "2023-08-17T14:40:54.514271Z",
                    "modified": "2023-08-17T14:41:43.920355Z",
                    "name": "install-podman",
                    "description": "",
                    "unified_job_template": 43,
                    "launch_type": "workflow",
                    "status": "successful",
                    "execution_environment": 1,
                    "failed": false,
                    "started": "2023-08-17T14:41:44.440039Z",
                    "finished": "2023-08-17T14:42:12.263602Z",
                    "canceled_on": null,
                    "elapsed": 27.824,
                    "job_explanation": "",
                    "execution_node": "awx_1",
                    "controller_node": "awx_1",
                    "launched_by": {
                        "id": 1,
                        "name": "admin",
                        "type": "user",
                        "url": "/api/v2/users/1/"
                    },
                    "work_unit_id": "1sooe9al",
                    "job_type": "run",
                    "inventory": 13,
                    "project": 10,
                    "playbook": "playbooks/install-podman.yml",
                    "scm_branch": "",
                    "forks": 0,
                    "limit": "",
                    "verbosity": 0,
                    "extra_vars": "{}",
                    "job_tags": "",
                    "force_handlers": false,
                    "skip_tags": "",
                    "start_at_task": "",
                    "timeout": 0,
                    "use_fact_cache": false,
                    "organization": 1,
                    "job_template": 43,
                    "passwords_needed_to_start": [],
                    "allow_simultaneous": false,
                    "artifacts": {},
                    "scm_revision": "cbdfb3f8fd83155696753432a2b934ae104a28ea",
                    "instance_group": 2,
                    "diff_mode": false,
                    "job_slice_number": 0,
                    "job_slice_count": 1,
                    "webhook_service": "",
                    "webhook_credential": null,
                    "webhook_guid": ""
                }
            ]
        }

        let new_div = results.processJobErrorEvents(result_events, testresult);
        results.append(new_div);
        console.log(new_div);

    });



    $("#fixmebutton").click(async function() {
        this.disabled = true; // disable button
        
        const handleData = handleDataCallback();  // initialize callback function with new counter        
     
        // ====================================================================================
        // Run workflow_job and register its running id. 
        const job = await $.ajax({
            url: tower_api_url + "workflow_job_templates/" + workflow_job + "/launch/",
            type: 'post',
            headers: {
                //"Authorization": "Basic " + btoa(username + ":" + password), // btoa() - creates a Base64-encoded ASCII string from a binary string
                "Authorization": "Bearer " + tower_token_write, 
                "Content-Type": "application/json",                
            },
            dataType: 'json'});
        
        // job je vzdy vracen jako pending, nebo running. Musim pravidelne poolovat api, abych zjistil, v jakem stavu jsou jeho dilci tasky. 
        // Z resultu spusteni v parametru 'job' zjistim id prave spusteneho jobu. Toto id budu poolovat. 
        
        // tady chybi await? Proto to dole probehne hned?
        asyncPoolWorkflowJob(job.id, handleData).then((value) => {
            console.log("then value = ", value);
            // jenze tady zadny answer neni. Je to undefined. 
            // takze tahle asynchronni funkce nic nevraci. Await ma smysl u promises, ale poolWorkflowJob() neni promise.
            // tohle by se melo tedy pustit az po skonceni poolWorkflowJob. A aby to tak bylo,
            // muselo by se to volat z nejakeho callbacku.

            // tady se na zacatku napise pending a pak uz to tam zustane, az to failed. 
            // ale melo by tam byt running.
            const msg = "Workflow <b>" + job.name + "</b> is " + job.status;
            // Tohle se tam vrzne hned na zacatku, kdyz se workflow spusti.  Protoze se ceka na ten poolWorkflowJob, ale tohle se provede hned. 
            // ale asi to neni dobry napad, na to spolehat.    
            // FIXME to id #myresults je na vice mistech, melo by se to hodit do konstanty. 
            // Classy techhle rotujicich sipek se v kaze major verzi fontawesome jmenuji jinak. Je potreba na to pamatovat pri pripadnem updatu FA. 
            $('#myresults').append('<div id="workflow_status" class="alert alert-primary" role="alert"> <i class="fas fa-sync-alt fa-spin"></i>   ' + msg + ' </div>');  // muze byt pending, failed atd.                

            // sem znovu povolit kliknuti na button, aby se mohl spustit dalsi job.
            console.log("uz to probehlo"); // tohle se ale spusti hned, protoze poolWorkflowJob je v jinem vlakne/stacku. 
        });            
        //this.disabled = false; // enable button
    });
     
});
        
