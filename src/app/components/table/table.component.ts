import { Component, AfterViewInit, ViewChild, inject, effect, OnInit } from '@angular/core'; // Added OnInit
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { TodoFormComponent } from '../form/form.component';
import { CustomPaginatorIntl } from '../../helper/custom-paginator-intl';
import { Todo } from "../../models/todo.model";
import { Tag } from '../../models/tag.model';
import { TodoStore } from '../../store/todo.store';
import { TagService } from '../../services/tag.service';

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
export class TodoTableComponent implements OnInit, AfterViewInit {
  
  private readonly dialog = inject(MatDialog);

  public readonly todoStore = inject(TodoStore); 
  public readonly tagService = inject(TagService);

  public dataSource = new MatTableDataSource<Todo>();
  public displayedColumns: string[] = ['id', 'name', 'status', 'priority', 'tags', 'actions'];
  public tagColorMap = new Map<string, string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      const todos = this.todoStore.filteredTodos(); 
      const tags = this.tagService.alleTags();

      this.dataSource.data = todos;
      this.tagColorMap = new Map(tags.map((tag: Tag) => [tag.name, tag.color]));
    });
  }

  ngOnInit(): void {
    this.todoStore.loadTodos();
    if (this.tagService.alleTags().length === 0) {
        this.tagService.loadTags();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onDelete(id: number): void {
    this.todoStore.deleteTodo(id);
  }

  onEdit(todo: Todo): void {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '400px',
      data: todo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoStore.updateTodo(result);
      }
    });
  }
}