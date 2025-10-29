/*
    Hier wird zuerst das Todo definiert, dann Beispiele erstellt und dann ein Stream erstellt der alle Todos liefert.
*/

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Todo {
    id: number;
    name: string;
    status: 'Aktive' | 'Wartet' | 'Abgeschlossen';
    priority: 'Niedrig' | 'Mittel' | 'Hoch';
}

const beispiele: Todo[] = [
    { id: 1, name: 'Einkaufen gehen', status: 'Aktive', priority: 'Mittel' },
    { id: 2, name: 'Projektbericht schreiben', status: 'Wartet', priority: 'Hoch' },
    { id: 3, name: 'Freunde treffen', status: 'Abgeschlossen', priority: 'Niedrig' },
];  

@Injectable({
    providedIn: 'root'
})

export class TodoService {
    private readonly alleTodos = new BehaviorSubject<Todo[]>([]);
    public readonly alleTodos$ = this.alleTodos.asObservable();

    constructor() {
        this.alleTodos.next(beispiele);
    }

    private getNewId(todos: Todo[]): number {
        return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    }

    addTodo(newTodoData: Omit<Todo, 'id' | 'status'>) {
        const currentTodos = this.alleTodos.getValue();

        const newTodo: Todo = {
            ...newTodoData,
            id: this.getNewId(currentTodos),
            status: 'Wartet',
        };
        this.alleTodos.next([...currentTodos, newTodo]);
    }
}