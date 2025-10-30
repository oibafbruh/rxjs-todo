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
    - `/done` eine auf- und zuklappbare Material Card für abgeschlossene Todos.
    - `/footer` ein simpler Footer.
    - `/form` ein Dialog Form für das Erstellen und Bearbeiten von Todos.
    - `/header` ein simpler Header mit Titel und Icons.
    - `/table` eine Material Table die alle Todos anzeigt, implementiert UI Kontrolle für das bearbeiten, löschen und sortieren der Todos.
    - `toolbar` eine Toolbar über der Tabelle, für Such- und Filterkontrollen, sowie der Schaltfläche zum Erstellen neuer Todos.
- Übersetzung für den Paginator in `/helper`
- `todo-filters.model.ts` und `todo.model.ts` legen die interfaces der Filter und Todos an und werden in `/models` gespeichert.
- Service Provider in `/services`
    - `data.service.ts` verwaltet den local storage und bearbeitet diesen Speicher nach den CRUD Funktionen.
    - `filter.service.ts` speichert aktive Filtereinstellungen und gibt diese weiter.
    - `todo.service.ts` erzeugt die Datenstreams für alle Todos, gefilterte Todos und abgeschlossene Todos. Übernimmt alle CRUD Funktionen und schreibt diese in die Datenstreams.