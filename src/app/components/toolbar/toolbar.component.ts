import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { initialState } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TodoFormComponent } from '../form/form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TodoService } from '../../services/todo.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from "@angular/material/tooltip";

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
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ActionToolbarComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private readonly todoService = inject(TodoService); // Dein Facade

  searchForm: FormGroup;
  private formSub!: Subscription;

  constructor() {
    // Dieses Formular steuert NUR noch das Suchfeld
    this.searchForm = this.fb.group({
      search: [initialState.search]
    });
  }

  ngOnInit(): void {
    // Diese Subscription sendet NUR Such-Updates
    this.formSub = this.searchForm.get('search')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchValue => {
      // Wir rufen updateFilters nur mit dem 'search'-Teil auf
      this.todoService.updateFilters({ search: searchValue });
    });
  }

  ngOnDestroy(): void {
    if (this.formSub) {
      this.formSub.unsubscribe();
    }
  }

  // Diese Methode ist von der Sidenav hierher umgezogen
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
