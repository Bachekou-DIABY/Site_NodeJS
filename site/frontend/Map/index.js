var map = L.map('map').setView([45.784, 4.875], 1.5);
let markers = L.markerClusterGroup();
let data = {};

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
function createPopupText(markerData) {
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
        res += markerData[key];
        res += "<br>";
    });

    return res;
}

// Gestion de l'évennement onClick des marqueurs
// Entrée : les données associées au marqueur
function markerOnClick(markerData) {
    let text = "";
    for (key in markerData) {
        if (markerData[key] == "") continue;
        text += key + " : ";
        if (key == "url") {
            text += "<a target=_blank href=";
            text += markerData[key];
            text += ">"
            text += markerData[key];
            text += "</a>";
        } else
            text += markerData[key];
        text += "<br><br>";
    }
    const cardContent = document.getElementById("infos-centrale");
    cardContent.innerHTML = text;
}

var nuclearIcon = L.icon({
    iconUrl: "icons/nuclearIcon.png",
    iconSize: [50, 50], // size of the icon
    iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -50] // point from which the popup should open relative to the iconAnchor
});

var solarIcon = L.icon({
    iconUrl: "icons/solarIcon.png",
    iconSize: [60, 70], // size of the icon
    iconAnchor: [30, 60], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
});

var windIcon = L.icon({
    iconUrl: "icons/windIcon.png",
    iconSize: [50, 50], // size of the icon
    iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -50] // point from which the popup should open relative to the iconAnchor
});

var hydroIcon = L.icon({
    iconUrl: "icons/hydroIcon.png",
    iconSize: [50, 50], // size of the icon
    iconAnchor: [25, 40], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
});

var oilIcon = L.icon({
    iconUrl: "icons/oilIcon.png",
    iconSize: [25, 40], // size of the icon
    iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
});

// Prend un object js contenant des champs "latitude" et "longitude"
// Styled est un booleen avec true pour les icons et false pour les marqueur
// par défauts
function createMarkers(styled) {
    for (i in data) {
        const markerData = data[i];

        let marker;
        if (styled) {
            if (markerData["primary_fuel"] == "Nuclear")
                marker = L.marker([parseFloat(markerData["latitude"]), parseFloat(markerData["longitude"])], {
                    icon: nuclearIcon
                });
            else if (markerData["primary_fuel"] == "Solar")
                marker = L.marker([parseFloat(markerData["latitude"]), parseFloat(markerData["longitude"])], {
                    icon: solarIcon
                });
            else if (markerData["primary_fuel"] == "Wind")
                marker = L.marker([parseFloat(markerData["latitude"]), parseFloat(markerData["longitude"])], {
                    icon: windIcon
                });
            else if (markerData["primary_fuel"] == "Hydro")
                marker = L.marker([parseFloat(markerData["latitude"]), parseFloat(markerData["longitude"])], {
                    icon: hydroIcon
                });
            else if (markerData["primary_fuel"] == "Oil")
                marker = L.marker([parseFloat(markerData["latitude"]), parseFloat(markerData["longitude"])], {
                    icon: oilIcon
                });
            else
                marker = L.marker([parseFloat(markerData["latitude"]), parseFloat(markerData["longitude"])]);
        } else
            marker = L.marker([parseFloat(markerData["latitude"]), parseFloat(markerData["longitude"])]);

        marker.bindPopup(createPopupText(markerData));
        marker.on('click', () => markerOnClick(markerData));
        markers.addLayer(marker);
    }
    map.addLayer(markers);
}

function clearMarkers() {
    map.removeLayer(markers);
    markers = L.markerClusterGroup();
}

document.getElementById('csvfile').addEventListener('change', function() {
    const file = event.target.files;

    if (!checkCSV(file)) return;

    var fr = new FileReader();
    fr.onloadend = function() {
        data = toObject(fr.result);
        createMarkers(true);
    }
    fr.readAsText(this.files[0]);
});

document.getElementById('styledIcons').addEventListener('change', function() {
    if (data == {}) return;
    clearMarkers();
    createMarkers(this.checked);
});
