import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TodoApplyFilterService } from '../../services/applyfilter.service';
import { TodoFormComponent } from '../form/form.component';

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
    MatDialogModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})

export class ToolbarComponent implements OnInit, OnDestroy {

  filterForm: FormGroup;
  private formSub!: Subscription;
  

  priorityOptions = ['Alle', 'Niedrig', 'Mittel', 'Hoch'];

  constructor(
    private fb: FormBuilder,
    private filterService: FilterService,
    private applyFilterService: TodoApplyFilterService,
    private dialog: MatDialog

  ) {
    this.filterForm = this.fb.group({
      search: [this.filterService.getInitialState().search],
      status: [this.filterService.getInitialState().status],
      priority: [this.filterService.getInitialState().priority],
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
    this.filterForm.reset(this.filterService.getInitialState());
  }

  openAddTodoDialog() {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '400px',
  });

  dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.applyFilterService.addTodo(result);
      }
    });
  }
}
