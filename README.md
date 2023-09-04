# awx-js
Javascript pro poolovani AWX api

## Základ

Script pomocí API ovládá AWX server, který spouští příslušné playbooky sestavené
do workflows. 

ID workflow se musí ve scriptu nastavit ručně, viz níže. Dle konzultací s panem
Žatečkou není vyloučené, že v budoucnu bude chtít, aby existovalo rozbalovací
menu, umožňující vybrat z různých předdefinovaných workflows, dle potřeby.

## Nastavení

- ID workflow
- Application token 
- Keycloak

## font awesome
Pro zobrazení animace běžících tasků je použit font awesome. Protože z prostředí
ŠA serveru nejsou dostupné vnější cdn, hostuju všechny potřebné assets lokálně.
Týká se to kromě Font Awesome i Bootstapu a Jquery. 

POZOR na to, že v každé verzi FA se mění jména některých classes, takže při
updatu mohou přestat fungovat animace točících se šipek. V takovém případě je
potřeba vyhledat nové názvy classes pro danou verzi. 

Současná verze není poslední, ale jde o verzi 5.15.4

## Mechanismus

Přes api se nejprve zavolá příslušný workflow, např. (viz debug.org)




# AWX

## Credentials
Pro Galaxy je potřeba definovat Galaxy Credentials a přiřadit je Organization. 

Dále je potřeba definovat credentials pro repozitáře (git) a případně pro
ovládané hosty. 
  
## Projects
  Každý projekt má type, který určuje zdroj dat pro projekt. V případě typu Git
  je potřeba nastavit a přiřadit příslušné credentials. 

## Application
  Vytvoření tokenu pro přístup z ovládacího scriptu. 

