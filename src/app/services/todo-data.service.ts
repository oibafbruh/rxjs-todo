import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { beispiele } from '../providers/sample-todos';

const storageKey = 'TodoItems';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  async get(): Promise<Todo[]> {
    await new Promise(resolve => setTimeout(resolve, 0));
    const storageValue = localStorage.getItem(storageKey);
    
    if (!storageValue) {
      this.saveInternal(beispiele);
      return beispiele;
    }
    
    return JSON.parse(storageValue);
  }

  async add(newTodo: Todo): Promise<void> {
    // throw new Error('Hallo');

    await new Promise(resolve => setTimeout(resolve, 0));

    const currentTodos = await this.get();
    const updatedTodos = [...currentTodos, newTodo];
    this.saveInternal(updatedTodos);
  }

  async update(updatedTodo: Todo): Promise<void> {
    const currentTodos = await this.get();
    const updatedTodos = currentTodos.map(t => t.id === updatedTodo.id ? updatedTodo : t);
    this.saveInternal(updatedTodos);
  }

  async delete(id: number): Promise<void> {
    const currentTodos = await this.get();
    const updatedTodos = currentTodos.filter(todo => todo.id !== id);
    this.saveInternal(updatedTodos);
  }

  async reset(): Promise<void> {
    localStorage.removeItem(storageKey);
  }

  async clear(): Promise<void> {
    this.saveInternal([]);
  }

  private saveInternal(todos: Todo[]): void {
    localStorage.setItem(storageKey, JSON.stringify(todos));
  }
}