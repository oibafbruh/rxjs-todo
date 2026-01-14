import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { Tag } from '../../models/tag.model';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TodoStore } from '../../store/todo.store';
import { TagStore } from '../../store/tag.store';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatTooltipModule,
    MatDividerModule,
    MatChipsModule
],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})

export class SideComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);

  private readonly todoService = inject(TodoStore);
  private readonly tagStore = inject(TagStore);
  filterForm: FormGroup;
  tagForm: FormGroup;
  private formSub!: Subscription;

  priorityOptions = ['Alle', 'Niedrig', 'Mittel', 'Hoch'];
  public alleTags = this.tagStore.tags;

  constructor() {
    this.filterForm = this.fb.group({
      status: 'Alle',
      priority: 'Alle',
    });
  
    this.tagForm = this.fb.group({
      name: ['', [Validators.required,
        this.duplicateTagValidator()]],
      color: ['#a8a8a8']
    });
  }

  private duplicateTagValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const currentTags = this.tagStore.tags();
      const tagNameNew = value.trim().toLowerCase();

      const tagExists = currentTags.some((tag: Tag) => tag.name.toLowerCase() === tagNameNew);

      return tagExists ? { duplicate : true } : null;
    }
  }

  ngOnInit(): void {
    this.formSub = this.filterForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe( formValues => {
      this.todoService.updateFilters(formValues);
    });
  }

  ngOnDestroy(): void {
    if (this.formSub) {
      this.formSub.unsubscribe();
    }   
  }

  reset() {
    this.filterForm.patchValue({
      status: 'Alle',
      priority: 'Alle'
    });
  }

  onAddTag(): void {
    if (this.tagForm.invalid) {
      return;
    }

    this.tagStore.addTag(this.tagForm.value);
    this.tagForm.reset({name: '', color: '#009826ff'});
  }

  onDeleteTag(tagName: string): void {
    this.tagStore.deleteTag(tagName);
  }
}
