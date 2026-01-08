import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TagDataService } from '../services/tag-data.service';
import { Tag } from '../models/tag.model';
import { AppStore } from './app.store';

interface TagState {
  tags: Tag[];
  loading: boolean;
  error: string | null;
};

const initialState: TagState = {
  tags: [],
  loading: false,
  error: null,
};

export const TagStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withProps(() => ({
    _tagDataService: inject(TagDataService),
    _snackBar: inject(MatSnackBar),
    _appStore: inject(AppStore),
  })),

  withMethods(({ _tagDataService, _appStore, ...store }) => {
    const _handleError = (message: string) => {
      patchState(store, { error: message });
      console.error(message);
      _appStore.showSnackbar(message);
    };

    return {
      loadTags() {
        _appStore.setLoading(true);
        Promise.resolve(_tagDataService.get())
          .then(tags => {
            patchState(store, { tags, error: null });
          })
          .catch(error => {
            _handleError('Fehler beim Laden der Tags: ' + error);
          })
          .finally(() => {
            _appStore.setLoading(false);
          });
      },

      addTag(newTag: Tag) {
        _appStore.setLoading(true);
        Promise.resolve()
          .then(() => {
            _tagDataService.add(newTag);
            patchState(store, (state) => ({
              tags: [...state.tags, newTag],
              error: null
            }));
            _appStore.showSnackbar("Tag erfolgreich hinzugefügt.");
          })
          .catch(error => {
            _handleError('Fehler beim Hinzufügen des Tags: ' + error);
          })
          .finally(() => {
            _appStore.setLoading(false);
          });
      },

      deleteTag(tagName: string) {
        _appStore.setLoading(true);
        Promise.resolve()
          .then(() => {
            _tagDataService.delete(tagName);
            patchState(store, (state) => ({
              tags: state.tags.filter((t) => t.name !== tagName),
              error: null
            }));
          })
          .catch(error => {
            _handleError('Fehler beim Löschen des Tags: ' + error);
          })
          .finally(() => {
            _appStore.setLoading(false);
          });
      },

      resetTags() {
        _appStore.setLoading(true);
        Promise.resolve()
          .then(() => {
            _tagDataService.reset();
            const initialTags = _tagDataService.get();
            patchState(store, { tags: initialTags, error: null });
          })
          .catch(error => {
            _handleError('Fehler beim Zurücksetzen der Tags: ' + error);
          })
          .finally(() => {
            _appStore.setLoading(false);
          });
      },

      clearTags() {
        _appStore.setLoading(true);
        Promise.resolve()
          .then(() => {
            _tagDataService.clear();
            patchState(store, { tags: [], error: null });
          })
          .catch(error => {
            _handleError('Fehler beim Leeren der Tags: ' + error);
          })
          .finally(() => {
            _appStore.setLoading(false);
          });
      }
    };
  })
);
