/*
    Hier wird der Datenstream "TodoFilters" erstellt, der die aktuellen Filter als BehaviourSubject hält. applyFilter.service.ts
    kann dieses Stream abrufen und mit dem Todo-Stream kombinieren, um eine gefilerte Liste für die Tabelle zu liefern.
*/

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface TodoFilters {
    search: string | null;
    status: 'Alle' | 'Aktiv' | 'Wartet' | 'Abgeschlossen';
    priority: 'Alle' | 'Niedrig' | 'Mittel' | 'Hoch';
}

const initialState: TodoFilters = {
    search: '',
    status: 'Alle',
    priority: 'Alle',
};

@Injectable({
    providedIn: 'root'
})

export class FilterService {

    private readonly filters = new BehaviorSubject<TodoFilters>(initialState);
    readonly filters$ = this.filters.asObservable();

    constructor() {}

    updateFilters(newFilters: Partial<TodoFilters>) {
        const currentState = this.filters.getValue();
        this.filters.next({ ...currentState, ...newFilters });
    }

    resetFilters() {
        this.filters.next(initialState);
    }

    getInitialState() {
        return initialState;
    }
}