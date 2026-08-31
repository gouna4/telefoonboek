# Telefoonboek

Boekhouding voor het in- en verkopen van telefoons: Nederland → Marokko.
Rekent euro's en dirham automatisch naar elkaar om.

**Geen server, geen account, geen internet nodig.** Wat je invult blijft in de
opslag van de browser op je eigen toestel en wordt nergens naartoe gestuurd.
Deze bestanden zijn leeg: wie de site opent, krijgt een leeg boek.

## Wat het bijhoudt

- Inkoop en verkoop per toestel, in euro's en dirham, met een instelbare koers
- Een tweede, doorgegeven inkoopprijs, zodat je eigen marge privé blijft
- Kosten voor transport en vervangen onderdelen
- Drie standen: op voorraad, bij klant (verkocht maar niet afbetaald), betaald
- Betalingen per klant, met wat er nog open staat
- Accupercentage en IMEI
- Controlelijst met testcodes per merk, voor bij de inkoop
- Bonnetje voor de klant en een overzicht voor je collega, in het Arabisch
- Cijferslot en een knop om alle privébedragen te verbergen

## Bestanden

    index.html        de hele app: opmaak en code in één bestand
    sw.js             offline werken; eerst het netwerk, dan de eigen kopie
    manifest.json     maakt hem installeerbaar op je beginscherm
    icon-192.png      pictogram
    icon-512.png      pictogram

## Een nieuwe versie uitbrengen

Verhoog het nummer op drie plekken, anders zie je je eigen wijziging niet:

1. `index.html` — `Marokko &middot; v9` in de kop
2. `index.html` — `Telefoonboek versie 9` onderaan de instellingen
3. `sw.js` — `telefoonboek-v9`

## Nooit in deze repo

Het back-upbestand uit de instellingen (`telefoonboek-JJJJ-MM-DD.json`).
Daarin staan klantnamen, echte inkoopprijzen en openstaande bedragen.

## Let op

De gegevens hangen aan het webadres. Verhuis je de app naar een ander adres,
maak dan eerst een back-up en zet die daarna terug via de instellingen.
