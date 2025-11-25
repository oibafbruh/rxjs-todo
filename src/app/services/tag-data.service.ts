import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.model'; 
import { beispielTags } from '../providers/sample-tags';

const storageKey = 'TodoTags';

@Injectable({
  providedIn: 'root'
})
export class TagDataService {

  getTags(): Tag[] {
    const storageValue = localStorage.getItem(storageKey);
    let items: Tag[];

    if (!storageValue) {
      items = beispielTags;
      localStorage.setItem(storageKey, JSON.stringify(beispielTags));
    }
    else {
      items = JSON.parse(storageValue);
    }
    return items;
  }

  saveTags(tags: Tag[]): void {
    localStorage.setItem(storageKey, JSON.stringify(tags));
  }

  delete(tagName: string): void {
    const currentTags = this.getTags();
    const updatedTags = currentTags.filter(tag => tag.name !== tagName);
    this.saveTags(updatedTags);
  }

  clearTags(): void {
    this.saveTags([]);
  }

  resetTags() {
    this.saveTags(beispielTags);
  }
}