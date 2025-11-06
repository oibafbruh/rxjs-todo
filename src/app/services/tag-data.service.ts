import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.model'; 
import { beispielTags } from '../providers/sample-tags';

const storageKey = 'TodoTags';

@Injectable({
  providedIn: 'root'
})
export class TagDataService {

  get(): Tag[] {
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

  saveAll(tags: Tag[]): void {
    localStorage.setItem(storageKey, JSON.stringify(tags));
  }

  delete(tagName: string): void {
    const currentTags = this.get();
    const updatedTags = currentTags.filter(tag => tag.name !== tagName);
    this.saveAll(updatedTags);
  }
}