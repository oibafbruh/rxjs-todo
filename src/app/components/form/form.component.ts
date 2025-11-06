import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from "../../models/todo.model"
import { Observable } from 'rxjs';
import { Tag } from '../../models/tag.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-form',
  standalone: true,
    imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class TodoFormComponent {
  private fb = inject(FormBuilder);
  dialogRef = inject<MatDialogRef<TodoFormComponent>>(MatDialogRef);
  data = inject<Todo | null>(MAT_DIALOG_DATA);
  private todoService = inject(TodoService);

  todoForm: FormGroup;
  priorityOptions = ['Niedrig', 'Mittel', 'Hoch'];
  formName: string;
  public alleTags$: Observable<Tag[]>;

  constructor() {
    this.alleTags$ = this.todoService.alleTags$;
    this.formName = this.data ? 'Bearbeite Todo' : 'Neues Todo';
    this.todoForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      priority: [this.data?.priority || 'Mittel', Validators.required],
      tags: [this.data?.tags ||[]]
    });
  }

  onSave(): void {
    if (this.todoForm.valid) {
      this.dialogRef.close({...this.data, ...this.todoForm.value });
    }
  }

  onCancel(): void{
    this.dialogRef.close();
  }
}