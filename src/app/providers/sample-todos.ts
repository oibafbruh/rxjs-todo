import { Todo } from '../models/todo.model';

export const beispiele: Todo[] = [
  { id: 1, name: 'Projektbericht fertigstellen', status: 'Aktiv', priority: 'Hoch', tags: ["Arbeit", "Dringend"] },
  { id: 2, name: 'Zahnarzttermin vereinbaren', status: 'Wartet', priority: 'Mittel', tags: ["Persönlich"] },
  { id: 3, name: 'Einkaufsliste schreiben', status: 'Aktiv', priority: 'Niedrig', tags: ["Einkauf"] },
  { id: 4, name: 'Präsentation vorbereiten', status: 'Aktiv', priority: 'Hoch', tags: ["Arbeit"] },
  { id: 5, name: 'Freund anrufen', status: 'Wartet', priority: 'Mittel', tags: ["Persönlich"] },
  { id: 6, name: 'Rechnungen bezahlen', status: 'Aktiv', priority: 'Hoch', tags: ["Persönlich", "Dringend"] },
  { id: 7, name: 'Neue Kaffeemaschine kaufen', status: 'Wartet', priority: 'Niedrig', tags: ["Einkauf", "Persönlich"] },
  { id: 8, name: 'Teammeeting vorbereiten', status: 'Aktiv', priority: 'Hoch', tags: ["Arbeit"] },
  { id: 9, name: 'Wohnung putzen', status: 'Wartet', priority: 'Mittel', tags: ["Persönlich"] },
  { id: 10, name: 'Bürobedarf bestellen', status: 'Aktiv', priority: 'Mittel', tags: ["Arbeit", "Einkauf"] },
  { id: 11, name: 'Geburtstagsgeschenk besorgen', status: 'Aktiv', priority: 'Hoch', tags: ["Persönlich", "Einkauf"] },
  { id: 12, name: 'Projektplan überarbeiten', status: 'Wartet', priority: 'Mittel', tags: ["Arbeit", "Dringend"] },
  { id: 13, name: 'Garten gießen', status: 'Abgeschlossen', priority: 'Niedrig', tags: ["Persönlich"] },
  { id: 14, name: 'Online-Kurs beenden', status: 'Aktiv', priority: 'Mittel', tags: ["Persönlich"] },
  { id: 15, name: 'Wocheneinkauf erledigen', status: 'Aktiv', priority: 'Hoch', tags: ["Einkauf", "Dringend"] }
];
