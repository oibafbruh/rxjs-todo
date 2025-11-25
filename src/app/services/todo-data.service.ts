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
    
    if (!storageValue) {
      this.save(beispiele);
      return beispiele;
    }
    
    return JSON.parse(storageValue);
  }

  add(newTodo: Todo): void {
    const currentTodos = this.get();
    const updatedTodos = [...currentTodos, newTodo];
    this.save(updatedTodos);
    console.log(`DataService: add(${newTodo.id}) ausgeführt`);
  }

  update(updatedTodo: Todo): void {
    const currentTodos = this.get();
    const updatedTodos = currentTodos.map(t => t.id === updatedTodo.id ? updatedTodo : t);
    this.save(updatedTodos);
    console.log(`DataService: update(${updatedTodo.id}) ausgeführt`);
  }

  delete(id: number): void {
    const currentTodos = this.get();
    const updatedTodos = currentTodos.filter(todo => todo.id !== id);
    this.save(updatedTodos);
    console.log(`DataService: delete(${id}) ausgeführt`);
  }

  reset(): void {
    localStorage.removeItem(storageKey);
  }

  clear(): void {
    this.save([]);
  }

  private save(todos: Todo[]): void {
    localStorage.setItem(storageKey, JSON.stringify(todos));
  }
}