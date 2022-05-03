const puppeteer = require('puppeteer');

(async () =>{
    const browser = await puppeteer.launch({headless: true}); //headless=true ne plus voir l'interface graphique
    const page = await browser.newPage(); 
    await page.goto(`https://www.rte-france.com/themes/swi/xml/power-production-fr.xml?_=1651418588898`);
    const data = await page.evaluate(()=>{
        let data = [];
        let total = 0;
        let cpt_Gaz = 0;
        let cpt_Fioul = 0;
        let cpt_Hydrolique = 0;
        let cpt_Autres = 0;
        let donnees = document.querySelectorAll('liste>mixtr>type')
        
        for(element of donnees){
            if(element.matches('[v=Nucléaire')){
                data.push({
                    Filieres: "Nucléaire",
                    Production: element.querySelector('valeur:last-child').textContent 
                })
                total+=parseInt(element.querySelector('valeur:last-child').textContent);
            }
            if(element.matches('[v=Charbon')){
                data.push({
                    Filieres: "Charbon",
                    Production: element.querySelector('valeur:last-child').textContent 
                })
                total+=parseInt(element.querySelector('valeur:last-child').textContent);
            }
            if(element.matches('[v=Gaz') && cpt_Gaz==0){
                cpt_Gaz++
                data.push({
                    Filieres: "Gaz",
                    Production: element.querySelector('valeur:last-child').textContent 
                })
                total+=parseInt(element.querySelector('valeur:last-child').textContent);
            }
            if(element.matches('[v=Fioul') && cpt_Fioul==0){
                cpt_Fioul++;
                data.push({
                    Filieres: "Fioul",
                    Production: element.querySelector('valeur:last-child').textContent 
                })
                total+=parseInt(element.querySelector('valeur:last-child').textContent);
            }
            if(element.matches('[v=Hydraulique') && cpt_Hydrolique==0){
                cpt_Hydrolique++;
                data.push({
                    Filieres: "Hydraulique",
                    Production: element.querySelector('valeur:last-child').textContent 
                })
                total+=parseInt(element.querySelector('valeur:last-child').textContent);
            }
            if(element.matches('[v=Eolien')){
                data.push({
                    Filieres: "Éolien",
                    Production: element.querySelector('valeur:last-child').textContent 
                })
                total+=parseInt(element.querySelector('valeur:last-child').textContent);
            }
            if(element.matches('[v=Solaire')){
                data.push({
                    Filieres: "Solaire",
                    Production: element.querySelector('valeur:last-child').textContent 
                })
                total+=parseInt(element.querySelector('valeur:last-child').textContent);
            }
            if(element.matches('[v=Autres') && cpt_Autres==0){
                cpt_Autres++;
                data.push({
                    Filieres: "Autres",
                    Production: element.querySelector('valeur:last-child').textContent 
                })
                total+=parseInt(element.querySelector('valeur:last-child').textContent);
            } 
        }
        for(element of data){
            element["Pourcentage"] = (parseInt(element["Production"])/total*100).toFixed(2);
        }      
        return data;
    });  
    
    console.log(data);
    await browser.close();
})();
