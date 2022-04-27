 //Chart.js
 const xlabels = [];
 const ylabels = [];

 //makeChart();
 async function makeChart(){  
     const CHART = document.getElementById('myChart');
     const myChart = new Chart(CHART, {
         type: 'doughnut',
         data: {
             labels: xlabels,
             datasets: [{
                 fontColor: '#f89f38',
                 label: 'Production Electricité en direct',
                 data: ylabels,
                 backgroundColor: [
                    '#ff9f40',//nuclear
                    '#404244',//charbon
                    '#ff6384',//gaz
                    '#4bc0c0',//Fioul
                    '#36a2eb',//Hydrolique
                    '#cecece',//Eolien
                    '#ffcd56'//Solaire
                ],
                 borderColor: ['rgba(0,0,0,0)'],
                 borderWidth: 1
             }]
         },
         options: {
            maintainAspectRatio: false,
            responsive: false,
            plugins:{legend: {display: false},}            
         }
     });
 }
 

 let http = new XMLHttpRequest();
 http.open('get', 'https://raw.githubusercontent.com/Mochtek/data/main/csvjson.json', true);
 http.send();
 
 http.onload = function (){
     if(this.readyState == 4 && this.status==200){
         let products = JSON.parse(this.responseText);
         //PRODUCTION
         let output_prod = "";
         for(let items of products){
             xlabels.push(items.Filieres);
             ylabels.push(items.Production)
             output_prod += `
             <div class="prod">
                 <div class="marker" style="background-color: var(--clr-${items.Filieres});"></div>
                 <div class="prod-text">
                     <span class="prod-nom">${items.Filieres}</span>
                     <div class="prod-prod">
                         <span>${items.Production}</span>
                         <span>Mw</span>
                     </div>
                 </div>
         </div>`;
         }
         document.querySelector("#container-production").innerHTML = output_prod;
         //POURCENTAGE
         let output_poucentage = "";
         for(let items of products){
             output_poucentage += `
                 <div class="pourcen">
                     <span class="pourcen-nom">${items.Filieres}</span>
                     <div class="pourcen-pourcen">
                         <span>${items.Pourcentage}</span>
                         <span>%</span>
                     </div>
                 </div>`;
         }
         document.querySelector("#container-pourcentage").innerHTML = output_poucentage   ;
     }   
     makeChart();
 }


