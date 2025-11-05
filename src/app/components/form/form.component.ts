import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from "../../models/todo.model"

@Component({
  selector: 'app-form',
    imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class TodoFormComponent {
  private fb = inject(FormBuilder);
  dialogRef = inject<MatDialogRef<TodoFormComponent>>(MatDialogRef);
  data = inject<Todo | null>(MAT_DIALOG_DATA);

  todoForm: FormGroup;
  priorityOptions = ['Niedrig', 'Mittel', 'Hoch'];
  formName: string;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.formName = this.data ? 'Bearbeite Todo' : 'Neues Todo';
    this.todoForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      priority: [this.data?.priority || 'Mittel', Validators.required]
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