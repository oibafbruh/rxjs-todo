import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { initialState } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TodoFormComponent } from '../form/form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TodoService } from '../../services/todo.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { Tag } from '../../models/tag.model';

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

  private readonly todoService = inject(TodoService);
  filterForm: FormGroup;
  tagForm: FormGroup;
  private formSub!: Subscription;

  priorityOptions = ['Alle', 'Niedrig', 'Mittel', 'Hoch'];
  public alleTags$: Observable<Tag[]>;

  constructor() {
    this.filterForm = this.fb.group({
      status: initialState.status,
      priority: initialState.priority,
    });
  

  this.tagForm = this.fb.group({
    name: ['', Validators.required],
    color: ['#00ff40ff']
  });

  this.alleTags$ = this.todoService.alleTags$;
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
    this.filterForm.patchValue(initialState);
  }

  onAddTag(): void {
    if (this.tagForm.invalid) {
      return;
    }

    this.todoService.addTag(this.tagForm.value);
    this.tagForm.reset({name: '', color: '#009826ff'});
  }

  onDeleteTag(tagName: string): void {
    this.todoService.deleteTag(tagName);
  }
}
