import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Todo } from "../../models/todo.model"
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-done',
  standalone: true,
  imports: [
    CommonModule, 
    MatExpansionModule,
    MatIconModule
  ],
  templateUrl: './done.component.html',
  styleUrl: './done.component.css'
})
export class DoneComponent {
  
  todoService = inject(TodoService);
  public doneTodos$ = this.todoService.doneTodos$;
  
}