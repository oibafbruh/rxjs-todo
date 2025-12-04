import { inject, Injectable, signal } from '@angular/core';
import { Tag } from '../models/tag.model';
import { TagDataService } from './tag-data.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private readonly dataService = inject(TagDataService);

  public readonly alleTags = signal<Tag[]>(this.dataService.getTags());

  addTag(newTag: Tag) {
    const updatedTags = [...this.alleTags(), newTag];
    this.dataService.saveTags(updatedTags);
    this.alleTags.update(() => updatedTags);
    }

  deleteTag(tagName: string) {
    this.alleTags.update(tags => {
      const updatedTags = tags.filter(t => t.name !== tagName);
      this.dataService.saveTags(updatedTags);
      return updatedTags;
    });
  }
}