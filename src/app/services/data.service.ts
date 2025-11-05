import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model'; 
import { beispiele } from '../providers/sample-todos';

const storageKey = 'TodoItems';

@Injectable({
  providedIn: 'root'
})
export class DataService {

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
    const index = currentTodos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      currentTodos[index] = updatedTodo;
      localStorage.setItem(storageKey, JSON.stringify(currentTodos));
    console.log("data.service.ts: update(" + updatedTodo.id + ") ausgeführt");
    } else {
      console.warn("data.service.ts: update Fehler - Todo ID nicht gefunden.")
    }
  }

  delete(id: number): void {
    const currentTodos = this.get();
    const updatedTodos = currentTodos.filter(todo => todo.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(updatedTodos));
    console.log("data.service.ts: delete(" + id + ") ausgeführt")
  }

  public reset(): void {
    localStorage.removeItem(storageKey);
  }

  public clear(): void {
    localStorage.setItem(storageKey, JSON.stringify([]));
  }
}