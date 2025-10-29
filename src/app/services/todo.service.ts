/*
  Dieser Service verwaltet jetzt nur noch den Status der Todos
  und holt sich die Anfangsdaten vom InitialService.
*/
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './model.service'; // Importiert aus der neuen Model-Datei
import { InitialService } from './initial.service'; // Importiert den neuen Service

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly alleTodos = new BehaviorSubject<Todo[]>([]);
  public readonly alleTodos$ = this.alleTodos.asObservable();

  constructor(private initialService: InitialService) {
    this.alleTodos.next(this.initialService.getInitialTodos());
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