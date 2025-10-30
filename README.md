# Todo V2 - Angular und RxJS Einführungsprojekt

Eine simple Todo App in Angular, mit Angular Material UI und RxJS state control.

# Features:
- CRUD Funktionen
- Speicher im local storage vom Browser
- Such-, Filter- und Sortierfunktion
- Seperate Datastreams für alle Todos, gefilterte Todos und abgeschlossene Todos
- Alle Userinputs in ReactiveForms

Projekt nutzt Angular CLI version 20.3.7.

# Struktur:
- UI Komponenten in `/components`
    1) `/done` eine auf- und zuklappbare Material Card für abgeschlossene Todos.
    2) `/footer` ein simpler Footer.
    3) `/form` ein Dialog Form für das Erstellen und Bearbeiten von Todos.
    4) `/header` ein simpler Header mit Titel und Icons.
    5) `/table` eine Material Table die alle Todos anzeigt, implementiert UI Kontrolle für das bearbeiten, löschen und sortieren der Todos.
    6) `/toolbar` eine Toolbar über der Tabelle, für Such- und Filterkontrollen, sowie der Schaltfläche zum Erstellen neuer Todos.
- Übersetzung für den Paginator in `/helper`
- `todo-filters.model.ts` und `todo.model.ts` legen die interfaces der Filter und Todos an und werden in `/models` gespeichert.
- Service Provider in `/services`
    1) `data.service.ts` verwaltet den local storage und bearbeitet diesen Speicher nach den CRUD Funktionen.
    2) `filter.service.ts` speichert aktive Filtereinstellungen und gibt diese weiter.
    3) `todo.service.ts` erzeugt die Datenstreams für alle Todos, gefilterte Todos und abgeschlossene Todos. Übernimmt alle CRUD Funktionen und schreibt diese in die Datenstreams.