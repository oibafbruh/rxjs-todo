import { Component, AfterViewInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TodoFormComponent } from '../form/form.component';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Todo } from "../../models/todo.model"
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CustomPaginatorIntl } from '../../helper/custom-paginator-intl';
import { TodoService } from '../../services/todo.service';
import { Tag } from '../../models/tag.model'

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSortModule,
    MatChipsModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})
export class TodoTableComponent implements OnDestroy, AfterViewInit {
  private dialog = inject(MatDialog);

  public dataSource = new MatTableDataSource<Todo>();
  public displayedColumns: string[] = ['id', 'name', 'status', 'priority', 'tags', 'actions'];
  private dataSubscription: Subscription;

  private readonly todoService = inject(TodoService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  @ViewChild(MatSort) sort!: MatSort;

  public tagColorMap = new Map<string, string>();

  constructor() {
    this.dataSubscription = this.todoService.filteredTodos$.subscribe(todos => {
      this.dataSource.data = todos;
    
      this.todoService.alleTags$.subscribe(tags => {
        this.tagColorMap = new Map(tags.map(tag => [tag.name, tag.color]));
      });
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  onDelete(id: number): void {
    this.todoService.deleteTodo(id);
  }

  onEdit(todo: Todo): void {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '400px',
      data: todo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.updateTodo(result);
      }
    });
  }
}