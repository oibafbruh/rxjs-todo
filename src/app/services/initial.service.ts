import { Injectable } from '@angular/core';
import { Todo } from './model.service'; 

const beispiele: Todo[] = [
  { id: 1, name: 'Einkaufen gehen', status: 'Aktiv', priority: 'Mittel' },
  { id: 2, name: 'Projektbericht schreiben', status: 'Wartet', priority: 'Hoch' },
  { id: 3, name: 'Freunde treffen', status: 'Abgeschlossen', priority: 'Niedrig' },
  { id: 4, name: 'Wäsche waschen', status: 'Aktiv', priority: 'Mittel' },
  { id: 5, name: 'Fitnessstudio besuchen', status: 'Aktiv', priority: 'Niedrig' },
  { id: 6, name: 'Rechnungen bezahlen', status: 'Wartet', priority: 'Hoch' },
  { id: 7, name: 'Müll rausbringen', status: 'Aktiv', priority: 'Niedrig' },
  { id: 8, name: 'Arzttermin vereinbaren', status: 'Wartet', priority: 'Mittel' },
  { id: 9, name: 'Angular-Projekt beenden', status: 'Aktiv', priority: 'Hoch' },
  { id: 10, name: 'Online-Kurs abschließen', status: 'Abgeschlossen', priority: 'Mittel' },
  { id: 11, name: 'Wohnung putzen', status: 'Aktiv', priority: 'Mittel' },
  { id: 12, name: 'Geburtstagsgeschenk kaufen', status: 'Wartet', priority: 'Mittel' },
  { id: 13, name: 'Auto zur Werkstatt bringen', status: 'Wartet', priority: 'Hoch' },
  { id: 14, name: 'E-Mails beantworten', status: 'Aktiv', priority: 'Mittel' },
  { id: 15, name: 'Bücher zurück zur Bibliothek', status: 'Abgeschlossen', priority: 'Niedrig' },
  { id: 16, name: 'Neues Rezept ausprobieren', status: 'Aktiv', priority: 'Niedrig' },
  { id: 17, name: 'Präsentation vorbereiten', status: 'Aktiv', priority: 'Hoch' },
  { id: 18, name: 'Urlaub buchen', status: 'Wartet', priority: 'Mittel' },
  { id: 19, name: 'Pflanzen gießen', status: 'Aktiv', priority: 'Niedrig' },
  { id: 20, name: 'Alte Kleidung aussortieren', status: 'Abgeschlossen', priority: 'Mittel' },
  { id: 21, name: 'Hund spazieren führen', status: 'Aktiv', priority: 'Mittel' },
  { id: 22, name: 'Technik-Blog lesen', status: 'Aktiv', priority: 'Niedrig' },
  { id: 23, name: 'Versicherungsunterlagen prüfen', status: 'Wartet', priority: 'Hoch' },
  { id: 24, name: 'Fahrrad reparieren', status: 'Wartet', priority: 'Mittel' },
  { id: 25, name: 'Task-Management-Tool evaluieren', status: 'Aktiv', priority: 'Mittel' },
  { id: 26, name: 'Kaffee kochen', status: 'Abgeschlossen', priority: 'Niedrig' },
  { id: 27, name: 'Team-Meeting organisieren', status: 'Wartet', priority: 'Hoch' },
  { id: 28, name: 'Code-Review durchführen', status: 'Aktiv', priority: 'Hoch' },
  { id: 29, name: 'Neuen Monitor recherchieren', status: 'Wartet', priority: 'Mittel' },
  { id: 30, name: 'Abendessen kochen', status: 'Aktiv', priority: 'Mittel' },
  { id: 31, name: 'Bug in der Software fixen', status: 'Abgeschlossen', priority: 'Hoch' },
  { id: 32, name: 'Spülmaschine ausräumen', status: 'Aktiv', priority: 'Niedrig' },
  { id: 33, name: 'Joggen gehen', status: 'Abgeschlossen', priority: 'Niedrig' },
  { id: 34, name: 'Kontoauszüge prüfen', status: 'Wartet', priority: 'Mittel' },
  { id: 35, name: 'Präsentation üben', status: 'Aktiv', priority: 'Hoch' },
  { id: 36, name: 'Eltern anrufen', status: 'Wartet', priority: 'Niedrig' },
  { id: 37, name: 'Dokumentation für API schreiben', status: 'Wartet', priority: 'Hoch' },
  { id: 38, name: 'Balkon aufräumen', status: 'Aktiv', priority: 'Niedrig' },
  { id: 39, name: 'Friseurtermin machen', status: 'Wartet', priority: 'Niedrig' },
  { id: 40, name: 'Steuererklärung vorbereiten', status: 'Abgeschlossen', priority: 'Hoch' },
  { id: 41, name: 'Neues Buch anfangen', status: 'Aktiv', priority: 'Niedrig' },
  { id: 42, name: 'Koffer für Geschäftsreise packen', status: 'Wartet', priority: 'Mittel' },
  { id: 43, name: 'Kundenfeedback einholen', status: 'Aktiv', priority: 'Hoch' },
  { id: 44, name: 'Keller entrümpeln', status: 'Wartet', priority: 'Mittel' },
  { id: 45, name: 'Handy-Vertrag kündigen', status: 'Abgeschlossen', priority: 'Mittel' },
  { id: 46, name: 'Backup vom Computer machen', status: 'Wartet', priority: 'Hoch' },
  { id: 47, name: 'Sprachkurs-Lektion lernen', status: 'Aktiv', priority: 'Mittel' },
  { id: 48, name: 'Glühbirne wechseln', status: 'Aktiv', priority: 'Niedrig' },
  { id: 49, name: 'Wochenplan erstellen', status: 'Aktiv', priority: 'Mittel' },
  { id: 50, name: 'Router neu starten', status: 'Abgeschlossen', priority: 'Niedrig' },
  { id: 51, name: 'Yoga-Übungen machen', status: 'Aktiv', priority: 'Niedrig' }
];

@Injectable({
  providedIn: 'root'
})
export class InitialService {

  constructor() { }

  // Eine einfache Methode, um die Daten bereitzustellen
  getInitialTodos(): Todo[] {
    return beispiele;
  }
}