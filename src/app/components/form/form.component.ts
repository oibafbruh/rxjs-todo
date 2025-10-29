import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

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
  todoForm: FormGroup;
  priorityOptions = ['Niedrig', 'Mittel', 'Hoch'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TodoFormComponent>,
  ) {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      priority: ['Mittel', Validators.required]
    });
  }

  onSave(): void {
    if (this.todoForm.valid) {
      this.dialogRef.close(this.todoForm.value);
    }
  }

  onCancel(): void{
    this.dialogRef.close();
  }

}
