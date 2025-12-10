import { inject, Injectable, signal } from '@angular/core';
import { Tag } from '../models/tag.model';
import { TagDataService } from './tag-data.service';
import { AppStore } from '../store/app.store';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private readonly dataService = inject(TagDataService);
  private readonly appStore = inject(AppStore);

  public readonly alleTags = signal<Tag[]>(this.dataService.get());

  loadTags(): void {
    this.appStore.setLoading(true);
    Promise.resolve(this.dataService.get())
      .then((tags) => {
        this.alleTags.set(tags);
      })
      .catch((error) => {
        console.error('Fehler beim Laden der Tags', error);
        this.appStore.showSnackbar('Fehler beim Laden der Tags: ' + error);
      })
      .finally(() => {
        this.appStore.setLoading(false);
      });
  }

  addTag(newTag: Tag): void {
    this.appStore.setLoading(true);
    Promise.resolve()
      .then(() => {
        this.dataService.add(newTag);
        this.alleTags.update((tags) => [...tags, newTag]);
      })
      .catch((error) => {
        console.error('Fehler beim Hinzufügen eines Tags', error);
        this.appStore.showSnackbar('Fehler beim Hinzufügen des Tags: ' + error);
      })
      .finally(() => {
        this.appStore.setLoading(false);
      });
  }

  deleteTag(tagName: string): void {
    this.appStore.setLoading(true);
    Promise.resolve()
      .then(() => {
        this.dataService.delete(tagName);
        this.alleTags.update((tags) =>
          tags.filter((t) => t.name !== tagName)
        );
      })
      .catch((error) => {
        console.error('Fehler beim Löschen eines Tags', error);
        this.appStore.showSnackbar('Fehler beim Löschen des Tags: ' + error);
      })
      .finally(() => {
        this.appStore.setLoading(false);
      });
  }

  resetTags(): void {
    this.appStore.setLoading(true);
    Promise.resolve()
      .then(() => {
        this.dataService.reset();
        const initialTags = this.dataService.get();
        this.alleTags.set(initialTags);
      })
      .catch((error) => {
        console.error('Fehler beim Zurücksetzen der Tags', error);
        this.appStore.showSnackbar('Fehler beim Zurücksetzen der Tags: ' + error);
      })
      .finally(() => {
        this.appStore.setLoading(false);
      });
  }

  clearTags(): void {
    this.appStore.setLoading(true);
    Promise.resolve()
      .then(() => {
        this.dataService.clear();
        this.alleTags.set([]);
      })
      .catch((error) => {
        console.error('Fehler beim Leeren der Tags', error);
        this.appStore.showSnackbar('Fehler beim Leeren der Tags: ' + error);
      })
      .finally(() => {
        this.appStore.setLoading(false);
      });
  }
}