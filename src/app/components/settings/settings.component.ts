import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TodoService } from '../../services/todo.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-form',
    imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent { 
    public dialogRef = inject(MatDialogRef<SettingsComponent>);
    private todoService = inject(TodoService);

    onClearStorage(): void {
        this.todoService.clearTodos();
        this.dialogRef.close();
    }

    onResetStorage(): void {
        this.todoService.resetTodos();
        this.dialogRef.close();
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
