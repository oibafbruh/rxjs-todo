import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tag } from '../models/tag.model';
import { TagDataService } from './tag-data.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private readonly dataService = inject(TagDataService);
  private readonly snackBar = inject(MatSnackBar);

  public readonly alleTags = signal<Tag[]>(this.dataService.get());
  public loading = signal<boolean>(false);
  public readonly error = signal<string | null>(null);

  loadTags(): void {
    this.loading.set(true);
    try {
      const tags = this.dataService.get();
      this.alleTags.set(tags);
      this.error.set(null);
    } catch (error) {
      console.error('Fehler beim Laden der Tags', error);
      this.handleError('Fehler bei loadTag');
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
      this.handleError('Fehler bei addTag');
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
      this.handleError('Fehler bei deleteTag');
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
      this.handleError('Fehler bei resetTags');
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
      this.handleError('Fehler bei clearTags');
    } finally {
      this.loading.set(false);
    }
  }

  private handleError(message: string) {
    this.error.set(message);
    this.snackBar.open(message, 'Schließen', {
      duration: 3000,
    });
  }
}