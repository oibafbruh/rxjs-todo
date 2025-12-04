/*
  Dieser Service verwaltet den Status der Todos als Facade
  und nutzt Angular Signals statt RxJS.
*/
import { inject, Injectable, signal, computed } from '@angular/core';
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

  public readonly filters = signal<TodoFilters>(initialState);
  public readonly alleTodos = signal<Todo[]>(this.dataService.get());

  public readonly alleTags = this.tagService.alleTags;

  //computed funktion für filter
  public readonly filteredTodos = computed(() => {
    const todos = this.alleTodos();
    const activeFilters = this.filters();
    const searchFilter = activeFilters.search?.toLowerCase() ?? '';

    return todos.filter(todo => {
      const searchMatch = todo.name.toLowerCase()
        .includes(searchFilter);
    
      const statusMatch = activeFilters.status === 'Alle' || todo.status === activeFilters.status;
      
      const priorityMatch = activeFilters.priority === 'Alle' || todo.priority === activeFilters.priority;

      return searchMatch && statusMatch && priorityMatch;
    });
  });
    
  //computed funktion für abgeschlossene todos
  public readonly doneTodos = computed(() => {
    const todos = this.alleTodos();
    return todos.filter(todo => todo.status === "Abgeschlossen");
  });

  private getNewId(): number {
    const todos = this.alleTodos();
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }

  addTodo(newTodoData: Todo) {
    const newTodo: Todo = {
        id: this.getNewId(),
        name: newTodoData.name,
        status: "Wartet",
        priority: newTodoData.priority,
        tags: newTodoData.tags || []
      };

    this.dataService.add(newTodo);
    this.alleTodos.update(todos => {
      return [...todos, newTodo];
    });
  }

  deleteTodo(id: number) {
    this.dataService.delete(id);
    this.alleTodos.update(todos => {
      return todos.filter(todo => todo.id !== id);
    });
  }

  updateTodo(updatedTodo: Todo) {
    const todoToUpdate = { ...updatedTodo, tags: updatedTodo.tags || [] };
    this.dataService.update(todoToUpdate);

    this.alleTodos.update(todos => {
      return todos.map(t => t.id === todoToUpdate.id ? todoToUpdate : t);
    });
  }

  resetTodos(): void {
    this.dataService.reset();
    const initialData = this.dataService.get();
    this.alleTodos.set(initialData);
  }

  clearTodos(): void {
    this.dataService.clear();
    this.alleTodos.set([]); 
  }

  updateFilters(newFilters: Partial<TodoFilters>) {
      this.filters.update(currentState => ({ ...currentState, ...newFilters }));
  }

  addTag(newTag: Tag) {
    this.tagService.addTag(newTag);
  }

  deleteTag(tagName: string): void {
    this.tagService.deleteTag(tagName);
  }
}