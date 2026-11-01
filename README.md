# Finanzen

Schlanke, kostenlose Finanz-Übersicht für zwei Konten (Tenge und Euro) – als Web-App zum Installieren auf iPhone, iPad und Mac.

- **Adresse:** https://dannymuench-sys.github.io/finanzen/
- **Deine Daten bleiben auf dem Gerät.** Sie liegen nur im Speicher des Browsers bzw. der installierten App – nicht in diesem Repository, nicht auf einem Server.
- Wechselkurse kommen kostenlos und ohne Anmeldung von der [fawazahmed0 currency-api](https://github.com/fawazahmed0/exchange-api). Sie können leicht vom Bankkurs abweichen.

---

## 1. Auf iPhone / iPad installieren

1. Die Adresse oben in **Safari** öffnen (nicht in Chrome o. Ä.).
2. Unten (iPad: oben rechts) auf **Teilen** tippen (Quadrat mit Pfeil nach oben).
3. Nach unten scrollen und **„Zum Home-Bildschirm“** wählen, dann **„Hinzufügen“**.
4. Ab jetzt die App **immer über das Symbol auf dem Home-Bildschirm** öffnen.

> **Wichtig:** Die installierte App und der Safari-Tab haben **getrennte Speicher**. Was du im Safari-Tab einträgst, siehst du in der installierten App nicht (und umgekehrt). Also nur die installierte App benutzen.

Auf dem **Mac** reicht es, die Adresse in Safari zu öffnen. Optional: Menü **Ablage → „Zum Dock hinzufügen“**.

Die App funktioniert nach dem ersten Öffnen auch **ohne Internet**. Neue Versionen der App werden im Hintergrund geladen und erscheinen beim **übernächsten** Öffnen.

## 2. Synchronisieren zwischen Geräten (per Datei)

Es gibt keinen Server – der Abgleich läuft über eine Datei in deinem iCloud Drive.

**Auf dem Gerät mit den neuesten Einträgen:**
1. Tab **Mehr → „Sync-Datei speichern“**.
2. iPhone/iPad: Im Teilen-Menü **„In Dateien sichern“ → iCloud Drive** wählen (vorhandene Datei ersetzen). Mac: Die Datei landet in „Downloads“.

**Auf dem anderen Gerät:**
1. Tab **Mehr → „Sync-Datei laden“** und die Datei aus iCloud Drive wählen.
2. Die Daten werden **zusammengeführt**: Neues kommt dazu, bei Änderungen gewinnt die neuere, Gelöschtes wird auch dort gelöscht. Nichts wird doppelt.

Tipp: Danach auf dem zweiten Gerät gleich wieder „Sync-Datei speichern“, dann haben beide alles. Die Sync-Datei ist gleichzeitig deine **Sicherung** – die App erinnert dich, wenn die letzte Sicherung über zwei Wochen her ist.

## 3. Kontoauszug importieren (CSV)

1. Tab **Mehr → „Anleitung für Claude kopieren“**.
2. In Claude einfügen und den Kontoauszug (PDF/Screenshot) anhängen. Claude liefert eine CSV-Datei im passenden Format.
3. Die CSV-Datei in „Dateien“ sichern, dann **Mehr → „CSV-Datei auswählen“**.
4. Die App zeigt eine **Prüfansicht**: *neu*, *wiederkehrend* (gehört zu einem geplanten Posten), *doppelt* (schon erfasst) und **unklar** (gelb – bitte ansehen). Pro Zeile kannst du wählen, was passieren soll.
5. Optional: Haken bei „Kontostand auf den Saldo laut Auszug setzen“.
6. **„Import ausführen“.** Die gleiche Datei ein zweites Mal zu importieren schadet nicht – alles wird als doppelt erkannt.

Format (erste Zeile genau so, Trennzeichen Semikolon):

```
datum;konto;betrag;beschreibung;kategorie;originalbetrag;originalwaehrung;saldo
2026-11-03;KZT;-21500;MOL Tankstelle;Tanken & Auto;-15000;HUF;
2026-11-05;EUR;-49.99;Kreditrate;Kredit;;;1234.56
```

- `konto`: `KZT` oder `EUR` · `betrag`: in Kontowährung, Ausgaben negativ
- `originalbetrag`/`originalwaehrung` nur bei Zahlung in fremder Währung · `saldo` optional
- Eine Beispieldatei gibt es unter **Mehr → „Vorlage laden“**.

## 4. Gut zu wissen

- **Kontostand korrigieren:** Auf den Kontostand tippen und den Stand laut Bank eintragen. Kleine Ausgaben musst du nicht einzeln erfassen.
- **Ohne Internet** wird jede Buchung trotzdem gespeichert; der Tageskurs wird automatisch nachgetragen, sobald wieder Internet da ist (oder über „Kurse jetzt aktualisieren & nachtragen“).
- **Sehr alte Kurse** (nach meinem Kenntnisstand vor etwa März 2024) bietet die Kursquelle nicht an – solche Buchungen bleiben dann ohne Euro-Umrechnung.
- **Alle Daten löschen** (Mehr → Daten) betrifft nur das jeweilige Gerät. Vorher eine Sync-Datei speichern!

---

### Technik (für später)

Eine einzige Datei `index.html` (HTML, CSS, JavaScript, keine Abhängigkeiten), dazu `manifest.webmanifest`, `sw.js` (Offline-Speicher) und die Symbole (`icon.svg` ist die Vorlage). Bei Änderungen an der App in `sw.js` die Versionsnummer (`CACHE`) erhöhen.
