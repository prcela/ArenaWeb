# Yamb: bilješke uz pravne dokumente

Verzija dokumenata: 28. rujna 2026. Izmjene su pripremljene u repozitoriju; nisu objavljene i nisu potvrda pravne usklađenosti poslovanja. Tekst EULA-e i Politike privatnosti je na engleskom, a povezani FAQ je usklađen na hrvatskom i engleskom.

## Podaci i donesene odluke

- Pružatelj: Rika Omega Rika, vl. Kresimir Prcela, Pavlenski put 5k, 10000 Zagreb, Hrvatska. Korisnik je potvrdio da su podaci s Google Playa aktualni te da je Appleov zapis zastario.
- Kontakt: yamb.igre@gmail.com i poslovna adresa. Broj telefona namjerno je izostavljen na izričit zahtjev korisnika.
- EULA obuhvaća iOS i Android. Zadržani su postojeći sidreni linkovi `#connection-interruptions` i `#volunteer-moderators`.
- Postojeća dobna politika 17 godina / roditeljsko odobrenje preformulirana je bez istodobnog zahtjeva da je svatko stariji od 17. Time se ne tvrdi da je uvedena tehnička provjera dobi ili roditeljskog pristanka.
- Odredbe protiv varanja, korekcije rezultata i zaštita kupljenog sadržaja odvojene su od prigovora zbog prekida veze. Odredbe o moderatorima ne prenose zakonsku odgovornost pružatelja na volontere niti daju apsolutni imunitet.
- Verzija dokumenta nije tvrdnja da su novi uvjeti već dostavljeni ili prihvaćeni. Za objavu i primjenu potrebne su odgovarajuće obavijesti i, gdje je primjenjivo, prihvat novih uvjeta.

## Provjerena osnova u izvornom kodu

Pregledan je lokalni projekt `/Users/prcela/work/hello`; nije provjerena konfiguracija aktivnog produkcijskog procesa.

| Pravilo | Izvor | Nalaz |
| --- | --- | --- |
| Stopa naknade | `cmd/yamb/configProd.json` | `tax: 4`; razvojna konfiguracija ima drukčiju vrijednost. |
| MP naknada | `internal/game/match.go`, obračun `takeForFund` | Za svakog igrača: cijeli dio od `ulog × 4 / 100`; preostali ulozi dodjeljuju se pobjedniku. |
| OVA naknada i raspodjela | `internal/game/oneVsAll.go` | Obični krug s više od jednog igrača: cijeli dio od `ukupni ulozi × 96 / 100`. Za 2–3 igrača fond dobiva prvi; za 4+ dijeli se 60/30/10, svaki iznos zaokružen naniže. Jedan igrač nema taj odbitak; dnevne nagrade koriste zaseban obračun. |
| Dnevni izazov s ulogom | `internal/game/dailyChallengeTopList.go`, `internal/game/dailyChallengeResult.go` | Fond je cijeli dio od `broj uplata × ulog × 96 / 100`; do tri dobitnika u omjeru 6:3:1, prilagođenom broju dobitnika, uz ostatak zadnjem dobitniku. Besplatni i beat-the-bot izazovi imaju zasebna pravila. |
| Darovanja | `cmd/yamb/configProd.json`, `internal/game/client.go` | Limit 2.500.000 po uređaju po serverskom danu; 4% na cijeli poklon koji prelazi limit i sljedeće poklone, uz uključenu opciju; iznos naknade zaokružuje se naniže. Moderatorski računi izuzeti su od ove naknade. |
| Rok MP poteza | `internal/game/match.go` | Zadano trajanje + 5 s; prepoznati prekid aktualnog igrača dodaje 20 s najviše jednom po igraču u partiji. Ponovno spajanje ne pokreće novi rok. |
| Operativno čuvanje | `internal/game/mdb.go`, `cleanDb` | Akcijski zapisi i promjene dijamanata/ELO-a: 7 dana; MP/OVA rezultati, listići i replay: 90 dana; ostali obični rezultati/listići: 20 dana. To nisu rokovi svih podataka i sigurnosnih kopija. |

Primjeri za provjeru: MP 2 × 1.000 → 80 naknade i 1.920 nagrade; MP 2 × 101 → po 4 naknade i 194 nagrade; OVA 4 × 101 → fond 387 i nagrade 232/116/38, uz 1 neraspodijeljeni dijamant zbog zaokruživanja.

## Otvorene operativne točke prije objave

1. **Appleovi podaci i kontaktni zahtjevi.** Ažurirati zastarjeli zapis pružatelja na App Storeu. Appleovi minimalni uvjeti za vlastitu EULA-u traže i telefonski kontakt; on je izostavljen prema korisnikovoj uputi. Zbog toga se ovaj tekst ne označava potpuno usklađenim sa svim Appleovim minimalnim uvjetima.
2. **Prikaz naknade prije sudjelovanja.** Pregledani klijenti pokazuju tekst o naknadi u prikazu rezultata i imaju kontrole naknade za darovanja. Nije potvrđen jasan prikaz opće naknade prije svake uplate/ulaska. Nova EULA i FAQ ne zamjenjuju pravodobnu obavijest u aplikaciji. Nije mijenjan mobilni kod.
3. **Promjene stope tijekom aktivne igre.** Server računa naknadu prema konfiguraciji pri obračunu. Nije potvrđeno spremanje stope uz svaku uplatu. Dok to nije osigurano, stopu ne mijenjati tako da zahvati već prihvaćene uloge.
4. **Poništavanje i preostala naknada.** `internal/game/room.go`, `fUndoMatchImp`, kod dvaju igrača oduzima pobjedniku jedan izvorni ulog i vraća ga drugom igraču; ne vraća automatski raniji odbitak naknade. Poništenje stoga nije potpuno vraćanje svih stanja. EULA predviđa provjeru i dodatnu korekciju gdje je opravdana/zakonski potrebna. Postupak za više igrača također treba zasebnu provjeru prije oslanjanja na njega; ovdje nije mijenjan backend.
5. **Jednaki kriteriji i tehnička ograničenja poništenja.** Kod sadrži ograničenja automatskog poništenja za Fallout, OVA s brojem igrača različitim od dva te iznimku prema konkretnom nadimku u `matchResult.go`. Takvo ograničenje alata ne smije samo po sebi ukinuti zakonski osnovanu provjeru/korekciju. Iznimku vezanu uz identitet igrača treba uskladiti s pravilom jednakih kriterija; novi pravni tekst ne predstavlja potvrdu ispravnosti tog koda.
6. **Privatnost u stvarnoj implementaciji.** U klijentima su pronađeni Firebase Crashlytics, Analytics i obavijesti. Prije objave provjeriti stvarne postavke prikupljanja, privole gdje su potrebne, ugovore s izvršiteljima obrade, zemlje obrade, sigurnosne kopije i rokove ostalih zbirki. Objavljeni Google Play opis navodi da se podaci ne prikupljaju; uskladiti store deklaracije sa stvarnom obradom. Nije provedena potpuna GDPR ili SDK revizija.
7. **Prigovori i obavijesti.** Osigurati potvrdu primitka, odgovor u zakonskom roku i evidenciju pisanih potrošačkih prigovora godinu dana. Čuvati verzije uvjeta i dokaz dostave/prihvata gdje je potreban. Datum dokumenta sam po sebi nije prihvat uvjeta.
8. **Završni pravni pregled.** Provjeriti eventualne dodatne obvezne identifikacijske podatke te pravila maloljetnika, povrata, prekogranične prodaje i pravnu kvalifikaciju igre prema stvarnim mehanikama. Dokument ne tvrdi da naziv virtualne valute ili nemogućnost isplate samostalno rješava pravnu kvalifikaciju.

## Izvori korišteni pri doradi

- [Apple: minimum terms for a developer EULA](https://www.apple.com/legal/internet-services/itunes/dev/minterms/)
- [Google Play: Yamb, podaci pružatelja](https://play.google.com/store/apps/details?id=app.igre.yamb&hl=en)
- [Zakon o zaštiti potrošača, NN 19/2022](https://narodne-novine.nn.hr/clanci/sluzbeni/2022_02_19_203.html), osobito čl. 10 i odredbe o nepoštenim uvjetima; [izmjene NN 59/2026](https://narodne-novine.nn.hr/clanci/sluzbeni/2026_06_59_728.html).
- [Zakon o određenim aspektima ugovora o isporuci digitalnog sadržaja i digitalnih usluga, NN 110/2021](https://narodne-novine.nn.hr/clanci/sluzbeni/2021_10_110_1925.html), osobito odgovornost za nedostatke, teret dokazivanja, pravna sredstva i promjene usluge.
- [CPC Network: Key Principles on In-game Virtual Currencies, 21 March 2025](https://commission.europa.eu/document/download/8af13e88-6540-436c-b137-9853e7fe866a_en?filename=Key%2520principles%2520on%2520in-game%2520virtual%2520currencies.pdf).
- [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679), posebno čl. 5, 6, 12, 13 i prava ispitanika.
- [Firebase: privacy and security](https://firebase.google.com/support/privacy) i [AZOP](https://azop.hr/).

## Izvršene provjere

- HTML struktura EULA-e, Politike privatnosti i brisanja računa: uredno zatvoreni elementi, jedinstveni ID-jevi i 16 glavnih odjeljaka EULA-e.
- Lokalne poveznice i sidra na izmijenjenim stranicama vode na postojeće datoteke i odjeljke.
- U novim pravnim dokumentima nema telefonskog kontakta ni prethodnih bezuvjetnih tvrdnji o nepovratnosti svih kupnji.
- Pregled u lokalnom pregledniku: EULA, odjeljak o naknadama i Politika privatnosti prikazuju se čitljivo.
- `git diff --check` prolazi uz uvažavanje postojećih CRLF završetaka redaka FAQ-a.
