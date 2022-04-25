const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let AToken = params.AToken; // "some_value" 
  let RToken = params.RToken; // "some_value" 
  let UToken = params.UToken; // "some_value" 
  let Debut = params.Debut; // "some_value" 
  let Fin = params.Fin; // "some_value" 

 //Chart.js
 const xlabels = [];
 const ylabels = [];

 //makeChart();
 async function makeChart(){
    
    const CHART = document.getElementById('myChart');
    const myChart = new Chart(CHART, {
        type: 'bar',
        data: {
            labels: xlabels,
            datasets: [{
                fontColor: '#f89f38',
                label: 'Production Electricité en direct',
                data: ylabels,
                backgroundColor: [
                    'rgba(61, 243, 82, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(243, 66, 184, 0.4)',
                    'rgba(153, 102, 255, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 255, 255, 0.4)',
                    'rgba(255, 206, 86, 0.4)'
                ],
                borderColor: [
                    'rgb(61, 243, 82)',
                    'rgb(0, 0, 0)',
                    'rgb(243, 66, 184)',
                    'rgb(153, 102, 255)',
                    'rgb(54, 162, 235)',
                    'rgb(255,255, 255)',
                    'rgb(255, 206, 86)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {display: false}
            },
            scales: {
                x: {ticks: {font :{size:20},color: 'white'}},
                y: {ticks: {font :{size:20},color: 'white'}}
            }
        }
    });
}


 let http = new XMLHttpRequest();
 http.open('get', 'enedis?AToken='+AToken+'&RToken='+RToken+'&UToken='+UToken+'&Debut='+Debut+'&Fin='+Fin+'' , true);
 //http.open('get', 'enedis?AToken=9PB8OHYpEDkXZDmScy0sr1UXZPjPJgEdQ01Ji27yIjos7USDmyNfrX&RToken=Dihu65H5n7lv39Lfp5C3CWuBtPcIBVgiheds8MSlIl90qg&UToken=19101302405289&Debut=2022-04-05&Fin=2022-04-10', true);

 http.send();
 
 http.onload = function (){
    if(this.readyState == 4 && this.status==200){
        let products = JSON.parse(this.responseText);
        //PRODUCTION
        let output_prod = "";
        for(let items of products.data){
            xlabels.push(items.value);
            ylabels.push(items.value)
            output_prod += `
            <div class="prod">
                <img src="/img/energyLogo.png">
                <div class="prod-text">
                    <span class="prod-nom">${items.value}</span>
                    <div class="prod-prod">
                        <span>${items.value}</span>
                        <span>Mw</span>
                    </div>
                </div>
        </div>`;
        }
        document.querySelector("#container-production").innerHTML = output_prod;
        //POURCENTAGE
        let output_poucentage = "";
        for(let items of products.data){
            output_poucentage += `
                <div class="pourcen">
                    <span class="pourcen-nom">${items.value}</span>
                    <div class="pourcen-pourcen">
                        <span>${items.value}</span>
                        <span>%</span>
                    </div>
                </div>`;
        }
        document.querySelector("#container-pourcentage").innerHTML = output_poucentage   ;
    }
    makeChart();

}
         /*
         let conso = JSON.parse(this.responseText);
         //PRODUCTION
         let output_prod = "";
         for(let items of conso.data){
             xlabels.push(items.value);
             ylabels.push(items.date)
             output_prod += `
             <div class="prod">
                 <div class="marker" style="background-color: var(--clr-${items.value});"></div>
                 <div class="prod-text">
                     <span class="prod-nom">${items.value}</span>
                     <div class="prod-prod">
                         <span>${items.value}</span>
                         <span>Mw</span>
                     </div>
                 </div>
         </div>`;
         }
         document.querySelector("#container-production").innerHTML = output_prod;
         //POURCENTAGE
         let output_poucentage = "";
         for(let items of conso){
             output_poucentage += `
                 <div class="pourcen">
                     <span class="pourcen-nom">${items.value}</span>
                     <div class="pourcen-pourcen">
                         <span>${items.value}</span>
                         <span>%</span>
                     </div>
                 </div>`;
         }
         document.querySelector("#container-pourcentage").innerHTML = output_poucentage   ;*/



