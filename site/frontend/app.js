const express = require('express');
const app = express();
const linky = require('linky');
const bodyParser = require("body-parser");
const puppeteer = require('puppeteer');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public',express.static('/public'));


app.use('/accueil', function (req, res) {
    res.sendFile(__dirname + '/Accueil/accueil.html');
});

app.use('/map', function (req, res) {
    res.sendFile(__dirname + '/Map/map.html');
});

app.use('/energymix', function (req, res) {
    res.sendFile(__dirname + '/Energymix/energymix.html');
}); 

app.get('/json', function (req, res) {
    res.sendFile(__dirname + '/public/csv/out.json');
});

app.use('/linky', function (req, res) {
    res.sendFile(__dirname + '/Linky/linky.html');
});

app.get('/enedis',  (req,res) => {
    let AToken = req.query.AToken;
    let RToken = req.query.RToken;
    let UToken = req.query.UToken;
    let Debut = req.query.Debut;
    let Fin = req.query.Fin;

    //pour acceder a la page : 
    const session = new linky.Session({
        accessToken: AToken,
        refreshToken: RToken,
        usagePointId: UToken,
        onTokenRefresh: (accessToken, refreshToken) => {
            // Cette fonction sera appelée si les tokens sont renouvelés
            // Les tokens précédents ne seront plus valides
            // Il faudra utiliser ces nouveaux tokens à la prochaine création de session
            // Si accessToken et refreshToken sont vides, cela signifie que les tokens ne peuvent plus
            // être utilisés. Il faut alors en récupérer des nouveaux sur conso.vercel.app
        },
    });
    session.getDailyConsumption(Debut, Fin).then((conso) => {
    res.status(200).json(conso)
    
    });

});

app.use('/conso', function (req, res) {
    res.sendFile(__dirname + '/Linky/conso.html');
});

app.get('/stats', function (req, res) {
    res.sendFile(__dirname + '/Stats/stats.html');
});



app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/About/about.html');
});

app.get('/energymixAPI', function (req, res) {
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
    res.status(200).json(data);
    await browser.close();
})();
});




module.exports = app;