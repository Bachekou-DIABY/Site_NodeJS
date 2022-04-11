var map = L.map('map').setView([45.784, 4.875], 1.5);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYnJlZWVuIiwiYSI6ImNremNqOWxsMjAwdXczMnBkN3ZjNWl4dngifQ.Hi9Sd3SMyHP0F9cqlHf1OQ'
}).addTo(map);

// Vérifie si le fichier est un csv
function checkCSV(file) {
    const nameSplit = file[0].name.split(".");
    if (nameSplit.length <= 1) return false;
    return nameSplit[nameSplit.length - 1] == "csv";
}

// Convertit le texte d'un csv en un object js
function toObject(string) {
    const rows = string.split("\n"); // Séparation des lignes
    rows.pop(); // On enleve le dernier élément qui est vide
    const array = rows.map(row => row.split(",")); // Séparation des colones

    // Création d'un object qui contiendra les données
    // Pour chaque ligne des pairs [clé, attribut]
    // Avec clé le nom de la colone et attribut la valeur
    let object = {};
    for (i = 1; i < array.length; i++) {
        object[i - 1] = {};
        for (j = 0; j < array[0].length; j++) {
            object[i - 1][array[0][j]] = array[i][j];
        }
    }

    return object;
}

// Génère le texte à afficher dans les popups associées aux marqueurs
// Entrée : les données d'un marqueur
function createPopupText(data) {
    let keys = [
        "name",
        "country",
        "latitude",
        "longitude",
        "primary_fuel",
        "capacity_mw"
    ];
    let res = "";

    keys.forEach(key => {
        res += key + " : ";
        res += data[key];
        res += "<br>";
    });

    return res;
}

// Gestion de l'évennement onClick des marqueurs
// Entrée : les données associées au marqueur
function markerOnClick (data) {
    let text = "";
    for (key in data) {
        if (data[key] == "") continue;
        text += key + " : ";
        if (key == "url") {
            text += "<a target=_blank href=";
            text += data[key];
            text += ">"
            text += data[key];
            text += "</a>";
        }
        else
            text += data[key];
        text += "<br><br>";
    }
    const cardContent = document.getElementById("infos-centrale");
    cardContent.innerHTML = text;
}

// Prend un object js contenant des champs "latitude" et "longitude"
function createMarkers(data) {
    let markers = L.markerClusterGroup();
    for (i in data) {
        const markerData = data[i];
        const marker = L.marker([parseFloat(markerData["latitude"]), parseFloat(markerData["longitude"])]);
        marker.bindPopup(createPopupText(markerData));
        marker.on('click', () => markerOnClick(markerData));
        markers.addLayer(marker);
    }
    map.addLayer(markers);
}

document.getElementById('csvfile').addEventListener('change', function() {
    const file = event.target.files;

    if (!checkCSV(file)) return;

    var fr = new FileReader();
    fr.onloadend = function() {
        data = toObject(fr.result);
        createMarkers(data);
    }
    fr.readAsText(this.files[0]);
});
