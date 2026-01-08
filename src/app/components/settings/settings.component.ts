import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TagStore } from '../../store/tag.store';
import { TodoStore } from '../../store/todo.store';


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
    private todoService = inject(TodoStore);
    private tagStore = inject(TagStore);

    onClearStorage(): void {
        this.todoService.clearTodos();
        this.tagStore.clearTags();
        this.dialogRef.close();
    }

    onResetStorage(): void {
        this.todoService.resetTodos();
        this.tagStore.resetTags();
        this.dialogRef.close();
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
