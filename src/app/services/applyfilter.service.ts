/* 
    Hier wird der Datenstream der Todos mit dem der Filtereinstellungen kombiniert, um eine gefilterte Liste von Todos zu übertragen.
*/
import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { FilterService, TodoFilters } from './filter.service';
import { TodoService, Todo } from './todo.service';

@Injectable({
    providedIn: 'root'
})

export class TodoApplyFilterService {
    public readonly filteredTodos$: Observable<Todo[]>;

    constructor(
        private todoService: TodoService,
        private filteredSerivice: FilterService
    ) {
        this.filteredTodos$ = combineLatest([
            this.todoService.alleTodos$,
            this.filteredSerivice.filters$
        ]).pipe(
            debounceTime(0),
            map(([todos, filters]) => this.applyFilters(todos, filters))
        );
    }
    private applyFilters(todos: Todo[], filters: TodoFilters): Todo[] {
    return todos.filter(todo => {
      const searchMatch = todo.name.toLowerCase()
        .includes(filters.search?.toLowerCase() ?? '');
      
      const statusMatch = filters.status === 'Alle' 
        || todo.status === filters.status;
      
      const priorityMatch = filters.priority === 'Alle' 
        || todo.priority === filters.priority;

      return searchMatch && statusMatch && priorityMatch;
    });
    }

    addTodo(newTodoData: Omit<Todo, 'id' | 'status'>) {
        this.todoService.addTodo(newTodoData);
    }

}
