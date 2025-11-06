import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model'; 
import { beispiele } from '../providers/sample-todos';

const storageKey = 'TodoItems';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  get(): Todo[] {
    const storageValue = localStorage.getItem(storageKey);
    let items: Todo[];
    if (!storageValue) {
      items = beispiele;
      localStorage.setItem(storageKey, JSON.stringify(beispiele));
    }
    else {
      items = JSON.parse(storageValue);
    }
    return items;
  }

  add(newTodo: Todo): void {
    const currentTodos = this.get();
    const updatedTodos = [...currentTodos, newTodo];
    localStorage.setItem(storageKey, JSON.stringify(updatedTodos));
    console.log("data.service.ts: add(" + newTodo.id + ") ausgeführt");
  }

  update(updatedTodo: Todo): void {
    const currentTodos = this.get();
    const newValue = currentTodos.map(t => t.id === updatedTodo.id ? updatedTodo : t);
    localStorage.setItem(storageKey, JSON.stringify(newValue));
    console.log("data.service.ts: update(" + updatedTodo.id + ") ausgeführt");
  }

  delete(id: number): void {
    const currentTodos = this.get();
    const updatedTodos = currentTodos.filter(todo => todo.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(updatedTodos));
    console.log("data.service.ts: delete(" + id + ") ausgeführt")
  }

  reset(): void {
    localStorage.removeItem(storageKey);
  }

  clear(): void {
    localStorage.setItem(storageKey, JSON.stringify([]));
  }
}

// private todosSubject = new BehaviorSubject<Todo[]>(this.get());
// todos$ = this.todosSubject.asObservable();

  // add(newTodo: Todo): void {
  //   const updatedTodos = [...this.todosSubject.value, newTodo];
  //   this.saveTodos(updatedTodos);
  // }


  // private saveTodos(todos: Todo[]): void {
  //   localStorage.setItem(this.storageKey, JSON.stringify(todos));
  //   this.todosSubject.next(todos);
  // }