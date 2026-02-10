import { Component, inject, signal, OnInit } from '@angular/core'; // Added OnInit
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { TodoFormComponent } from '../form/form.component';
import { CustomPaginatorIntl } from '../../helper/custom-paginator-intl';
import { Todo } from "../../models/todo.model";
import { TodoStore } from '../../store/todo.store';
import { TagStore } from '../../store/tag.store';
import { PageEvent } from '@angular/material/paginator'
import { createAngularTable,
         FlexRenderDirective,
         getCoreRowModel,
         getSortedRowModel,
         ColumnDef,
         SortingState,
         getPaginationRowModel
} from '@tanstack/angular-table'

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
    MatChipsModule,
    FlexRenderDirective
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
})

export class TodoTableComponent implements OnInit {

  public readonly todoStore = inject(TodoStore); 
  public readonly tagStore = inject(TagStore);
  private readonly dialog = inject(MatDialog);

  sorting = signal<SortingState>([]);
  pagination = signal({pageIndex: 0, pageSize: 25});

    readonly columns: ColumnDef<Todo>[] = [
    { accessorKey: 'id', header: 'ID'},
    { accessorKey: 'name', header: 'Name'},
    { accessorKey: 'status', header: 'Status'},
    { accessorKey: 'priority', header: 'Priorität'},
    {
      id: 'tags',
      header: 'Tags',
      cell: (info) => info.getValue(),
    },
    {
      id: 'actions',
      header: 'Aktionen',
      cell: (info) => info.row.original,
    }
  ];

  readonly table = createAngularTable(() => ({
    data: this.todoStore.filteredTodos(),
    columns: this.columns,
    state: {
      sorting: this.sorting(),
      pagination: this.pagination(),
    },
    onSortingChange: (updaterOrValue) => 
      typeof updaterOrValue === 'function' 
        ? this.sorting.update(updaterOrValue) 
        : this.sorting.set(updaterOrValue),
    onPaginationChange: (updaterOrValue) => 
      typeof updaterOrValue === 'function' 
        ? this.pagination.update(updaterOrValue) 
        : this.pagination.set(updaterOrValue),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  }))

  ngOnInit(): void {
    this.todoStore.loadTodos();
    if (this.tagStore.tags().length === 0) {
      this.tagStore.loadTags();
    }
  }

  onPageChange(e: PageEvent) {
    this.pagination.set({
      pageIndex: e.pageIndex,
      pageSize: e.pageSize
    });
  }

  getTagColor(tagName: string) {
    return this.tagStore.tags().find(t => t.name === tagName)?.color || '#ccc';
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