import { Component, inject } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TodoStore } from '../../store/todo.store';

@Component({
  selector: 'app-done',
  standalone: true,
  imports: [
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