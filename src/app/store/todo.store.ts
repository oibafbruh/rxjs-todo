import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../models/todo.model';
import { TodoFilters } from '../models/todo-filters.model';
import { TodoDataService } from '../services/todo-data.service';
import { AppStore } from './app.store';

interface TodoState {
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

  withProps(() => ({
    _todoDataService: inject(TodoDataService),
    _snackBar: inject(MatSnackBar),
    _appStore: inject(AppStore),
  })),

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
  })), 

  withMethods(({ _todoDataService, _appStore, ...store }) => {
    const _handleError = (message: string) => {
      patchState(store, { error: message });
      console.error(message);
      _appStore.showSnackbar(message);
    };

    return {
    loadTodos() {
      _appStore.setLoading(true);
      _todoDataService.get().then(todos => {
        patchState(store, { todos, error: null })
      }).catch(err => {
        _handleError('Fehler beim Laden der Todos: ' + err);
      }).finally(() => {
        _appStore.setLoading(false);
      });
    },

    addTodo(newTodoData: Omit<Todo, 'id' | 'status'>) {
      _appStore.setLoading(true);

        const currentTodos = store.todos()
        const newId = currentTodos.length > 0 ? Math.max(...currentTodos.map(t => t.id)) + 1 : 1;
        
        const newTodo: Todo = {
          ...newTodoData,
          id: newId,
          status: 'Wartet',
          tags: newTodoData.tags || []
        };

        _todoDataService.add(newTodo).then(() => {
          patchState(store, (state) => ({
            todos: [...state.todos, newTodo],
            error: null
          }));
        }).catch(err => {
            _handleError('Fehler beim Hinzufügen des Todos: ' + err);
          })
          .finally(() => {
            _appStore.setLoading(false);
          })
      },

    deleteTodo(id: number) {
      _appStore.setLoading(true);
      _todoDataService.delete(id).then(() => {
        patchState(store, (state) => ({
          todos: state.todos.filter((t) => t.id !== id),
          loading: false,
          error: null
      }));
      }).catch((err) => {
        _handleError('Fehler beim Löschen des Todos: ' + err);
      })
      .finally(() => {
        _appStore.setLoading(false);
      })
    },

    updateTodo(updatedTodo: Todo) {
      _appStore.setLoading(true);
        const todoToUpdate = { ...updatedTodo, tags: updatedTodo.tags || [] };
        _todoDataService.update(todoToUpdate).then(() => {
          patchState(store, (state) => ({
          todos: state.todos.map((t) => t.id === todoToUpdate.id ? todoToUpdate : t),
          loading: false,
          error: null
        }));
        }).catch((err) => {
          _handleError('Fehler beim Aktualisieren des Todos: ' + err);
        }).finally(() => {
          _appStore.setLoading(false);
        });
      },
    
    updateFilters(newFilters: Partial<TodoFilters>) {
      patchState(store, (state) => ({
        filters: { ...state.filters, ...newFilters }
      }));
    },

    resetTodos(): void {
    _appStore.setLoading(true);
    _todoDataService.reset().then(() => {
      return _todoDataService.get();
    }).then((todos) => {
      patchState(store, { todos, error: null});
    }).catch((error) => {
      _handleError('Fehler beim Zurücksetzen der Todos: ' + error);
    }).finally(() => {
      _appStore.setLoading(false);
    });
    },

  clearTodos(): void {
    _appStore.setLoading(true);
    _todoDataService.clear().then(() => {
      patchState(store, { todos: [] });
    }).catch((error) => {
      _handleError('Fehler beim Leeren der Todos: ' + error);
    }).finally(() => {
      _appStore.setLoading(false);
    });
  }};
  })
);  