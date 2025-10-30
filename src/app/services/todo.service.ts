/*
  Dieser Service verwaltet jetzt nur noch den Status der Todos
  und holt sich die Anfangsdaten vom InitialService.
*/
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Todo } from '../models/todo.model'; // Importiert aus der neuen Model-Datei
import { DataService } from './data.service'; // Importiert den neuen Service
import { FilterService } from './filter.service';
import { TodoFilters } from '../models/todo-filters.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly filterService = inject(FilterService);

  private readonly alleTodos = new BehaviorSubject<Todo[]>([]);
  public readonly alleTodos$ = this.alleTodos.asObservable();
  public readonly filteredTodos$: Observable<Todo[]>;
  public readonly doneTodos$: Observable<Todo[]>;


  //Fütter die initial Todos ins Array
  constructor(private initialService: DataService) {
    this.alleTodos.next(this.initialService.get());
    
    this.filteredTodos$ = combineLatest([
            this.alleTodos$,
            this.filterService.filters$
        ]).pipe(
            map(([todos, filters]) => this.applyFilters(todos, filters))
        );

        this.doneTodos$ = this.alleTodos$.pipe(
            map(todos => todos.filter(todo => todo.status === "Abgeschlossen"))
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

  deleteTodo(id: number) {
    const currentTodos = this.alleTodos.getValue();
    const updatedTodos = currentTodos.filter(todo => todo.id !== id);
    this.alleTodos.next(updatedTodos);
  }

  updateTodo(updatedTodo: Todo) {
    const currentTodos = this.alleTodos.getValue();
    const index = currentTodos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      const newTodos = [...currentTodos.slice(0, index), updatedTodo, ...currentTodos.slice(index + 1)];
      this.alleTodos.next(newTodos);
    }
  }
}