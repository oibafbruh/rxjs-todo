import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.model';
import { beispielTags } from '../providers/sample-tags';

const storageKey = 'TodoTags';

@Injectable({
  providedIn: 'root',
})
export class TagDataService {
  get(): Tag[] {
    const storageValue = localStorage.getItem(storageKey);

    if (!storageValue) {
      this.save(beispielTags);
      return beispielTags;
    }

    return JSON.parse(storageValue);
  }

  add(newTag: Tag): void {
    const currentTags = this.get();
    const updatedTags = [...currentTags, newTag];
    this.save(updatedTags);
  }

  delete(tagName: string): void {
    const currentTags = this.get();
    const updatedTags = currentTags.filter((tag) => tag.name !== tagName);
    this.save(updatedTags);
  }

  clear(): void {
    this.save([]);
  }

  reset(): void {
    localStorage.removeItem(storageKey);
  }

  private save(tags: Tag[]): void {
    localStorage.setItem(storageKey, JSON.stringify(tags));
  }
}