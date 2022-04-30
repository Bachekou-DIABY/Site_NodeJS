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

app.get('/test', function (req, res) {
(async () =>{
    const browser = await puppeteer.launch({headless: true}); //headless=true ne plus voir l'interface graphique
    const page = await browser.newPage(); 
    await page.goto(`https://www.rte-france.com/eco2mix/synthese-des-donnees`);
    const data = await page.evaluate(()=>{
        let data = [];
        let cpt=0;
        let elements = document.querySelectorAll('#chart-legend-623412095 > div.left-panel > div.icon-energy');
        for(element of elements){
            if(cpt>0){
                data.push({
                    Filieres: element.querySelector('div > span.label-container').textContent,
                    Production: element.querySelector('div > span.value-container > div.render-value > div.value > div.value-label').textContent    
                })
            }
            cpt++;
        }
        return data;
    });  
    res.status(200).json(data)
    await browser.close();

})();
});




module.exports = app;