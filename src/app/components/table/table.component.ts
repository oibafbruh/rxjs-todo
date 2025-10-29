import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, Subscription, combineLatest } from 'rxjs'; // Added Subscription
import { TodoApplyFilterService } from '../../services/applyfilter.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TodoFormComponent } from '../form/form.component';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator'; // Added MatPaginator
import { Todo } from "../../services/model.service"
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CustomPaginatorIntlService } from '../../services/intl.service';

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
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntlService }
  ]
})
export class TodoTableComponent implements OnDestroy {
  public dataSource = new MatTableDataSource<Todo>();
  public displayedColumns: string[] = ['id', 'name', 'status', 'priority', 'actions'];
  private dataSubscription: Subscription;

  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  
  @ViewChild(MatSort) set sort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(
    private todoApplyFilterService: TodoApplyFilterService,
    private dialog: MatDialog
  ) {
    this.dataSubscription = this.todoApplyFilterService.filteredTodos$.subscribe(todos => {
      this.dataSource.data = todos;
    if (this.dataSource.paginator) {
        this.dataSource.paginator = this.dataSource.paginator;
    }
    });
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  onDelete(id: number): void {
    this.todoApplyFilterService.deleteTodo(id);
  }

  onEdit(todo: Todo): void {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '400px',
      data: todo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoApplyFilterService.updateTodo(result);
      }
    });
  }
}