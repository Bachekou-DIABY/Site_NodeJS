console.log('fichier JS pour JSON executé');


let http = new XMLHttpRequest();
http.open('get', 'https://raw.githubusercontent.com/Mochtek/data/main/csvjson.json', true);
http.send();

http.onload = function(){
    if(this.readyState == 4 && this.status==200){
        let products = JSON.parse(this.responseText);
        let output = "";
        for(let items of products){
            output += `
            <div class="prod">
                <img src="./energyLogo.png">
                <div class="prod-text">
                    <span class="prod-nom">${items.Filieres}</span>
                    <div class="prod-prod">
                        <span>${items.Production}</span>
                        <span>Mw</span>
                    </div>
                </div>
           </div>`;
        }
        document.querySelector("#container-production").innerHTML = output;
    }
}