#!/usr/bin/python3
# Web Scraping
# Submited by : Tom Delahaye

from bs4 import BeautifulSoup
from csv import writer
import requests


CSV_FILENAME = 'out.csv'
# pour retrouver ce lien aller sur www.rte-france.com/eco2mix/synthese-des-donnees
# inpecter la page puis dans l'ongler "Network" ne selectionner que les fichier de type "XHR"
# au chargement de la page des GET sont éffectué on peut ensuite cliquer dessus les regarder en détails
# Dans "Headers" on peut trouver l'url ou le .xml (les données) sont récupérées 
url = "https://www.rte-france.com/themes/swi/xml/power-production-fr.xml?_=1644948756540"
xml = requests.get(url)
soup = BeautifulSoup(xml.content, "lxml")


date = soup.find('date_actuelle').text
# gaz_tag = soup.find('type', v= "Gaz")

tags = soup.find_all('type')
sommeProd = 0;
firstGaz = True
firstFioul = True
firstHydrolique = True
for tag in tags:
     #Nucléaire, Charbon, Eolien, Solaire, Gaz,  Fioul, Hydrolique, Autres TODO!!
     if (('v' in tag.attrs) and ((tag['v']=='Nucléaire') or (tag['v']=='Charbon') or (tag['v']=='Eolien') or (tag['v']=='Solaire') or 
     (tag['v']=='Gaz' and bool(firstGaz)) or (tag['v']=='Fioul' and bool(firstFioul)) or (tag['v']=='Hydraulique' and bool(firstHydrolique)))):
          sommeProd += int(tag.select_one(":last-child").text)
          if(tag['v']=='Gaz'):
               firstGaz = False
          if(tag['v']=='Fioul'):
               firstFioul = False
          if(tag['v']=='Hydraulique'):
               firstHydrolique = False

print(sommeProd)
                
