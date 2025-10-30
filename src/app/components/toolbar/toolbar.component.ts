import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FilterService, initialState } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TodoFormComponent } from '../form/form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-toolbar',
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
    MatAutocompleteModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})

export class ToolbarComponent implements OnInit, OnDestroy {
  
  private readonly todoService = inject(TodoService);
  filterForm: FormGroup;
  private formSub!: Subscription;
  

  priorityOptions = ['Alle', 'Niedrig', 'Mittel', 'Hoch'];

  constructor(
    private fb: FormBuilder,
    private filterService: FilterService,
    private dialog: MatDialog

  ) {
    this.filterForm = this.fb.group({
      search: initialState.search,
      status: initialState.status,
      priority: initialState.priority,
    });
  }

  ngOnInit(): void {
    this.formSub = this.filterForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe( formValues => {
      this.filterService.updateFilters(formValues);
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

  openAddTodoDialog() {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '400px',
  });

  dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.addTodo(result);
      }
    });
  }
}
