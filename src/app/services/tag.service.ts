import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tag } from '../models/tag.model';
import { TagDataService } from './tag-data.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private readonly dataService = inject(TagDataService);

  public readonly alleTags = signal<Tag[]>(this.dataService.getTags());

  constructor() {
    this.alleTags.next(this.dataService.get());
  }

  addTag(newTag: Tag) {
     this.alleTags.update(currentTags => [...currentTags, newTag]); {
       this.dataService.saveAll(updatedTags);
       return updatedTags;
    });
  }

  deleteTag(tagName: string): void {
    this.alleTags.update(currentTags => {
      const updatedTags = currentTags.filter(tag => tag.name !== tagName);
      this.dataService.saveTags(updatedTags);
      return updatedTags;
    });
  }
}