import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tag } from '../models/tag.model';
import { TagDataService } from './tag-data.service';

export interface TagState {
  tags: Tag[];
  loading: boolean;
  error: string | null;
}

const initialState: TagState = {
  tags: [],
  loading: false,
  error: null,
};

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private readonly dataService = inject(TagDataService);
  private readonly snackBar = inject(MatSnackBar);

  public readonly alleTags = signal<Tag[]>(this.dataService.get());
  public readonly loading = signal<boolean>(false);
  public readonly error = signal<string | null>(null);

  loadTags(): void {
    this.loading.set(true);
    try {
      const tags = this.dataService.get();
      this.alleTags.set(tags);
      this.error.set(null);
    } catch (error) {
      console.error('Fehler beim Laden der Tags', error);
      this.error.set('Fehler beim Laden der Tags');
      this.snackBar.open('Fehler beim Laden der Tags', 'Schließen', {
        duration: 3000,
      });
    } finally {
      this.loading.set(false);
    }
  }

  addTag(newTag: Tag): void {
    this.loading.set(true);
    try {
      this.dataService.add(newTag);
      this.alleTags.update((tags) => [...tags, newTag]);
      this.error.set(null);
    } catch (error) {
      console.error('Fehler beim Hinzufügen eines Tags', error);
      this.error.set('Fehler beim Hinzufügen eines Tags');
      this.snackBar.open('Fehler beim Hinzufügen eines Tags', 'Schließen', {
        duration: 3000,
      });
    } finally {
      this.loading.set(false);
    }
  }

  deleteTag(tagName: string): void {
    this.loading.set(true);
    try {
      this.dataService.delete(tagName);
      this.alleTags.update((tags) =>
        tags.filter((t) => t.name !== tagName)
      );
      this.error.set(null);
    } catch (error) {
      console.error('Fehler beim Löschen eines Tags', error);
      this.error.set('Fehler beim Löschen eines Tags');
      this.snackBar.open('Fehler beim Löschen eines Tags', 'Schließen', {
        duration: 3000,
      });
    } finally {
      this.loading.set(false);
    }
  }

  resetTags(): void {
    this.loading.set(true);
    try {
      this.dataService.reset();
      const initialTags = this.dataService.get();
      this.alleTags.set(initialTags);
      this.error.set(null);
    } catch (error) {
      console.error('Fehler beim Zurücksetzen der Tags', error);
      this.error.set('Fehler beim Zurücksetzen der Tags');
      this.snackBar.open('Fehler beim Zurücksetzen der Tags', 'Schließen', {
        duration: 3000,
      });
    } finally {
      this.loading.set(false);
    }
  }

  clearTags(): void {
    this.loading.set(true);
    try {
      this.dataService.clear();
      this.alleTags.set([]);
      this.error.set(null);
    } catch (error) {
      console.error('Fehler beim Leeren der Tags', error);
      this.error.set('Fehler beim Leeren der Tags');
      this.snackBar.open('Fehler beim Leeren der Tags', 'Schließen', {
        duration: 3000,
      });
    } finally {
      this.loading.set(false);
    }
  }
}