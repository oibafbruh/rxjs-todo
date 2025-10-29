import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Observable, combineLatest } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { FilterService, TodoFilters } from '../../services/filter.service';
import { TodoService, Todo } from '../../services/todo.service';
import { TodoApplyFilterService } from '../../services/applyfilter.service';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule
    ],
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})

export class TodoTableComponent {
    public filteredTodos$: Observable<Todo[]>;
    public displayedColumns: string[] = ['id', 'name', 'status', 'priority'];

    constructor(private todoApplyFilterService: TodoApplyFilterService) {
        this.filteredTodos$ = this.todoApplyFilterService.filteredTodos$;
    }
}