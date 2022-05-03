#!/usr/bin/python3
# Web Scraping
# Submited by : Tom Delahaye

from bs4 import BeautifulSoup
import requests

#url of the website we want to scrape data from
url = "https://nuclear-energy.net/nuclear-power-plants/united-states"
page = requests.get(url)
soup = BeautifulSoup(page.text, 'html.parser')

centrals_list = soup.find('table', class_ = 'centrals_list')
cpt = 0

#print(centrals_list.find_all('tbody'))
for centrals in centrals_list.find_all('tbody'):
    rows = centrals.find_all('tr')
    for row in rows:
        cpt = cpt + 1

print("il y a ",cpt," centrales au USA")
