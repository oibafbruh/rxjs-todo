import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TodoStore } from '../../store/todo.store';

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
  
  todoStore = inject(TodoStore);
  public doneTodos = this.todoStore.doneTodos;
  
}