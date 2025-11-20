/*
  Dieser Service verwaltet jetzt nur noch den Status der Todos
  und holt sich die Anfangsdaten vom InitialService.
*/
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, from, map, Observable, switchMap, toArray } from 'rxjs';
import { Todo } from '../models/todo.model';
import { TodoDataService } from './todo-data.service';
import { TodoFilters } from '../models/todo-filters.model';
import { TagService } from './tag.service';
import { Tag } from '../models/tag.model';

export const initialState: TodoFilters = {
    search: '',
    status: 'Alle',
    priority: 'Alle',
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly dataService = inject(TodoDataService);
  private readonly tagService = inject(TagService);

  // public readonly filters = signal<TodoFilters>(initialState);
  // public readonly alleTodos = signal<Todo[]>(this.dataService.get());
  // public readonly alleTags = this.tagService.alleTags;

  private readonly filters = new BehaviorSubject<TodoFilters>(initialState);
  readonly filters$ = this.filters.asObservable();

  private readonly alleTodos = new BehaviorSubject<Todo[]>([]);
  public readonly alleTodos$ = this.alleTodos.asObservable();
  public readonly alleTags$ = this.tagService.alleTags$;

  public readonly filteredTodos$: Observable<Todo[]> = combineLatest([
            this.alleTodos$,
            this.filters$
        ]).pipe(
            map(([todos, filters]) =>
              todos.filter(todo => {
                const searchMatch = todo.name.toLowerCase()
                .includes(filters.search?.toLowerCase() ?? '');
            
               const statusMatch = filters.status === 'Alle' 
                  || todo.status === filters.status;
              
               const priorityMatch = filters.priority === 'Alle' 
                  || todo.priority === filters.priority;

                return searchMatch && statusMatch && priorityMatch;
              })
            )
        );
      
  public readonly doneTodos$: Observable<Todo[]> = this.alleTodos$.pipe(
              map(todos => todos.filter(todo => todo.status === "Abgeschlossen"))
  );

  constructor() {
        this.alleTodos.next(this.dataService.get());
      }
  
  private getNewId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }

  addTodo(newTodoData: Omit<Todo, 'id' | 'status'>) {
    const currentTodos = this.alleTodos.getValue();

    const newTodo: Todo = {
      id: this.getNewId(currentTodos),
      name: newTodoData.name,
      status: "Wartet",
      priority: newTodoData.priority,
      tags: newTodoData.tags ||[]
    };

    this.dataService.add(newTodo);
    this.alleTodos.next([...currentTodos, newTodo]);
  }

  deleteTodo(id: number) {
    this.dataService.delete(id);
    const currentTodos = this.alleTodos.getValue();
    const updatedTodos = currentTodos.filter(todo => todo.id !== id);
    this.alleTodos.next(updatedTodos);
  }

  updateTodo(updatedTodo: Todo) {
    const todoUpdate = { ...updatedTodo, tags: updatedTodo || [] };
    this.dataService.update(updatedTodo);
    const currentTodos = this.alleTodos.getValue();
    const newTodos = currentTodos.map(t => t.id === updatedTodo.id ? updatedTodo : t);
    this.alleTodos.next(newTodos);   
  }

  resetTodos(): void {
    this.dataService.reset();
    const initialData = this.dataService.get();
    this.alleTodos.next(initialData);
  }

  addTag(newTag: Tag) {
    this.tagService.addTag(newTag);
  }

  clearTodos(): void {
    this.dataService.clear();
    this.alleTodos.next([]);
  }

  updateFilters(newFilters: Partial<TodoFilters>) {
      const currentState = this.filters.getValue();
      this.filters.next({ ...currentState, ...newFilters });
  }

  deleteTag(tagName: string): void {
    this.tagService.deleteTag(tagName);
  }
}