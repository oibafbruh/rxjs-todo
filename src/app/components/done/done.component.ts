import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TodoApplyFilterService } from '../../services/applyfilter.service';
import { Todo } from "../../services/model.service"
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

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
  
  public doneTodos$: Observable<Todo[]>;

  constructor(private todoApplyFilterService: TodoApplyFilterService) {
    this.doneTodos$ = this.todoApplyFilterService.doneTodos$;
  }
}