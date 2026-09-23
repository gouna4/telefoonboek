# Klusboek

Klussen, bonnetjes en facturen bijhouden voor een klusjesman.

**Geen server, geen account, geen internet nodig.** Wat je invult blijft in de
opslag van de browser op je eigen toestel en wordt nergens naartoe gestuurd.
Deze bestanden zijn leeg: wie de site opent, krijgt een leeg boek.

De app staat standaard in het Arabisch. Met de knop rechtsboven (`NL` / `ع`)
wissel je naar het Nederlands en terug.

## Hoe het in elkaar zit

Zo eenvoudig als het kan:

    een KLANT heeft KLUSSEN
    een klus is af of niet, en heeft een bedrag, bonnetjes en foto's
    wat af is en nog niet op een factuur staat, zet je op een FACTUUR
    op die factuur komen de betalingen

Een bedrag staat op precies twee plekken: **bij de klus** (je arbeid) en **op
het bonnetje** (je materiaal). Er is geen tweede bedrag dat daaroverheen gaat,
dus een totaal is altijd gewoon de optelsom.

Bij een klant zie je drie groepen die de app zelf maakt:

    Nog te doen                     wat er nog ligt
    Klaar, nog niet gefactureerd    wat je kunt versturen
    Facturen                        wat je verstuurd hebt

Een factuur is een momentopname: de klussen met hun bedrag en het materiaal bij
elkaar. Pas je later een klus aan, dan blijft de factuur zoals je hem stuurde.
Verwijder je een factuur, dan komen die klussen terug in de middelste groep.

## Wat het bijhoudt

- Klanten met telefoonnummer, plaats en een notitie
- Klussen met een datum, een omschrijving en je arbeidsbedrag
- Een klus is af of niet; de app onthoudt op welke dag je hem afvinkte
- Tot zes foto's van het werk per klus
- Materialen als lijst, met een foto van het bonnetje per regel
- Facturen met hun betalingen, ook in delen. Betaal je meer dan er op staat,
  dan heet dat *Vooruitbetaald*
- Dirham of euro als hoofdmunt, met een instelbare koers; per bedrag kies je DH of €
- Het overzicht naar de klant sturen via WhatsApp of het deelmenu, of afdrukken
  en als PDF bewaren
- Vijf cijfers bovenaan, allemaal aan te tikken om te zien waar ze vandaan komen:
  nog factureren, wacht op betaling, deze maand binnen, werk in de planning,
  en dit jaar
- Maand voor maand terugkijken: wat je afrondde en wat er binnenkwam
- **Lijst plakken**: plak een lijstje uit de groepsapp en elke regel wordt een klus
- Soorten werk als knopjes onder het invulveld, met een plusje om er zelf een
  bij te zetten
- Zoeken door alles heen: klanten, klussen en facturen
- Een klus kopiëren, en een klus naar een andere klant verplaatsen door in het
  formulier een andere klant te kiezen
- Terugvegen gaat één scherm terug in plaats van de app te sluiten
- Een strook bovenaan als een factuur langer dan een maand wacht, of als je twee
  weken geen back-up maakte
- Een knop om alle bedragen te verbergen, en een cijferslot van vier cijfers
- Back-up maken en terugzetten, en vijf herstelpunten op het toestel zelf

## Bestanden

    index.html        de hele app: opmaak en code in één bestand
    sw.js             offline werken; eerst het netwerk, dan de eigen kopie
    manifest.json     maakt hem installeerbaar op je beginscherm
    icon-192.png      pictogram
    icon-512.png      pictogram

## Een nieuwe versie uitbrengen

Verhoog het nummer op twee plekken, anders zie je je eigen wijziging niet:

1. `index.html` — `var VERSIE='29'` bovenaan het script
2. `sw.js` — `klusboek-v29`

Het nummer verschijnt vanzelf onder de titel en onderaan de instellingen.

## Van een ouder boek naar deze versie

Tot versie 28 hingen klussen aan een **opdracht**, en het geld ook. Die laag is
weg. `uitOpdrachten()` zet een ouder boek om zodra je het opent of terugzet:

- elke klus gaat naar de klant van zijn opdracht
- elke opdracht waar geld in omging of die verstuurd was, wordt een factuur met
  de klussen die er klaar in stonden
- de rest worden gewone klussen bij de klant

Dat gebeurt één keer en wordt meteen bewaard.

## Bonnetjes en foto's

Het boek zelf staat in `localStorage` en die lade is maar zo'n 5 MB groot: daar
past geen foto in. Foto's gaan daarom in IndexedDB, een tweede lade op het
toestel die voor bestanden bedoeld is. Ze worden bij het toevoegen verkleind
naar ongeveer 1500 pixels en opnieuw opgeslagen als JPEG, zo'n 200 KB per stuk.

**Ze zitten niet in het back-upbestand.** Dat is tekst; een foto niet. Een
back-up terugzetten geeft je je boek terug, niet je foto's. Wil je er een
bewaren, tik hem dan aan en gebruik Sturen.

## Nooit in deze repo

Het back-upbestand uit de instellingen (`klusboek-JJJJ-MM-DD-uummss.json`).
Daarin staan klantnamen, telefoonnummers en bedragen. `.gitignore` houdt ze
tegen, maar kijk voor het uploaden of er niets tussen zit.

## Let op

De gegevens hangen aan het webadres. Verhuis je de app naar een ander adres,
maak dan eerst een back-up en zet die daarna terug via de instellingen.
