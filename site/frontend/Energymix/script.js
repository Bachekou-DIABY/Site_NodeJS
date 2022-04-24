let http = new XMLHttpRequest();
http.open('get', '/json', true);
//http.open('get', 'csvjson.json', true);
http.send();

http.onload = function (){
    if(this.readyState == 4 && this.status==200){
        let products = JSON.parse(this.responseText);
        //PRODUCTION
        let output_prod = "";
        for(let items of products){
            output_prod += ` <span>${items.Production}</span>`;
        }
        document.querySelector("#container-production").innerHTML = output_prod;
       
    }   
}