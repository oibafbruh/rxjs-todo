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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private readonly snackBar = inject(MatSnackBar);

  public readonly filters = signal<TodoFilters>(initialState);
  public readonly alleTodos = signal<Todo[]>([]);

  public readonly alleTags = this.tagService.alleTags;

  loading = this.tagService.loading;
  error = this.tagService.error;

  constructor() {
    this.loadInitialTodos();
  }

  async loadInitialTodos() {
    this.loading.set(true);
    try {
      const initialTodos = await this.dataService.get();
      this.alleTodos.set(initialTodos);
    } catch (error) {
      console.error('Fehler beim Laden der Todos:', error);
      this.error.set('Fehler in loadInitialTodos');
    } finally {
      this.loading.set(false);
    }
  }

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

  async addTodo(newTodoData: Todo): Promise<void> {
    this.loading.set(true);
    try {
      const newTodo: Todo = {
          id: this.getNewId(),
          name: newTodoData.name,
          status: "Wartet",
          priority: newTodoData.priority,
          tags: newTodoData.tags || []
        };

        await this.dataService.add(newTodo);
        this.alleTodos.update(todos => {
          return [...todos, newTodo];
        });
      } catch (error) {
        console.error('Fehler in addTodo', error);
        this.handleError('Fehler in addTodo');
      } finally {
        this.loading.set(false);
      }
    // this.dataService.add(newTodo).then(() => {
    //   this.alleTodos.update(todos => {
    //     return [...todos, newTodo];
    //   });
  }


  async deleteTodo(id: number): Promise<void> {
    this.loading.set(true);
    try {
      await this.dataService.delete(id);
      this.alleTodos.update(todos => { 
        return todos.filter(todo => todo.id !== id);
      });
    } catch (error) {
      console.error('Fehler in deleteTodo', error);
      this.handleError('Fehler in deleteTodo');
    } finally {
      this.loading.set(false);
    }
  }

  // updateTodo(updatedTodo: Todo) {
  //   const todoToUpdate = { ...updatedTodo, tags: updatedTodo.tags || [] };
  //   this.dataService.update(todoToUpdate);

  //   this.alleTodos.update(todos => {
  //     return todos.map(t => t.id === todoToUpdate.id ? todoToUpdate : t);
  //   });
  // }

  async updateTodo(updatedTodo: Todo): Promise<void> {
    this.loading.set(true);
    try {
      const todoToUpdate = { ...updatedTodo, tags: updatedTodo.tags || [] };
      await this.dataService.update(todoToUpdate);
      this.alleTodos.update(todos => {
        return todos.map(t => t.id === todoToUpdate.id ? todoToUpdate : t);
      });
      this.error.set(null);
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Todos', error);
      this.handleError('Fehler in updateTodo');
    } finally {
      this.loading.set(false);
    }
  }


  async resetTodos(): Promise<void> {
    this.loading.set(true);
    try {
      await this.dataService.reset();
      const initialData = await this.dataService.get();
      this.alleTodos.set(initialData);
      this.error.set(null);
    } catch (error) {
      console.error('Fehler beim Zurücksetzen der Todos', error);
      this.handleError('Fehler in resetTodos');
    } finally {
      this.loading.set(false);
    } 
  }

  async clearTodos(): Promise<void> {
    this.loading.set(true);
    try {
      await this.dataService.clear();
      this.alleTodos.set([]);
      this.error.set(null);
    } catch (error) {
      console.error('Fehler beim Leeren der Todos', error);
      this.error.set('Fehler in clearTodos');
      this.handleError('Fehler beim Leeren der Todos');
      // this.snackBar.open('Fehler beim Leeren der Todos', 'Schließen', {
      //   duration: 3000,
      // });
    } finally {
      this.loading.set(false);
    }
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

  private handleError(message: string) {
    this.error.set(message);
    this.snackBar.open(message, 'Schließen', {
      duration: 3000,
    });
  }
}