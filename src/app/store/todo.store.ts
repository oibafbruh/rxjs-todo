import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../models/todo.model';
import { TodoFilters } from '../models/todo-filters.model';
import { TodoDataService } from '../services/todo-data.service';

type TodoState = {
  todos: Todo[];
  filters: TodoFilters;
  loading: boolean;
  error: string | null;
};

const initialState: TodoState = {
  todos: [],
  filters: { search: '', status: 'Alle', priority: 'Alle' },
  loading: false,
  error: null,
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    filteredTodos: computed(() => {
      const todos = store.todos();
      const activeFilters = store.filters();
      const searchFilter = activeFilters.search?.toLowerCase() ?? '';

      return todos.filter((todo) => {
        const searchMatch = todo.name.toLowerCase().includes(searchFilter);
        const statusMatch = activeFilters.status === 'Alle' || todo.status === activeFilters.status;
        const priorityMatch = activeFilters.priority === 'Alle' || todo.priority === activeFilters.priority;
        return searchMatch && statusMatch && priorityMatch;
      });
    }),
    doneTodos: computed(() => {
      return store.todos().filter((todo) => todo.status === 'Abgeschlossen');
    }),
  })), withMethods((store, dataService = inject(TodoDataService), snackBar = inject(MatSnackBar)) => ({
    _handleError(message: string) {
      patchState(store, { error: message, loading: false });
      snackBar.open(message, 'Schließen', { duration: 3000 });
    },

    async loadTodos() {
      patchState(store, { loading: true });
      try {
        const todos = await dataService.get();
        patchState(store, { todos, loading: false, error: null });
      } catch (err) {
        this._handleError('Fehler beim Laden der Todos');
      }
    },

    async addTodo(newTodoData: Omit<Todo, 'id' | 'status'>) {
      patchState(store, { loading: true });
      try {
        const currentTodos = store.todos();
        const newId = currentTodos.length > 0 ? Math.max(...currentTodos.map(t => t.id)) + 1 : 1;
        
        const newTodo: Todo = {
          ...newTodoData,
          id: newId,
          status: 'Wartet',
          tags: newTodoData.tags || []
        };

        await dataService.add(newTodo);
        
        patchState(store, (state) => ({
          todos: [...state.todos, newTodo],
          loading: false,
          error: null
        }));
      } catch (err) {
        this._handleError('Fehler beim Hinzufügen des Todos');
      }
    },

    async deleteTodo(id: number) {
      patchState(store, { loading: true });
      try {
        await dataService.delete(id);
        patchState(store, (state) => ({
          todos: state.todos.filter((t) => t.id !== id),
          loading: false,
          error: null
        }));
      } catch (err) {
        this._handleError('Fehler beim Löschen des Todos');
      }
    },

    async updateTodo(updatedTodo: Todo) {
      patchState(store, { loading: true });
      try {
        const todoToUpdate = { ...updatedTodo, tags: updatedTodo.tags || [] };
        await dataService.update(todoToUpdate);
        
        patchState(store, (state) => ({
          todos: state.todos.map((t) => t.id === todoToUpdate.id ? todoToUpdate : t),
          loading: false,
          error: null
        }));
      } catch (err) {
        this._handleError('Fehler beim Aktualisieren des Todos');
      }
    },

    updateFilters(newFilters: Partial<TodoFilters>) {
      patchState(store, (state) => ({
        filters: { ...state.filters, ...newFilters }
      }));
    },
  }))
);