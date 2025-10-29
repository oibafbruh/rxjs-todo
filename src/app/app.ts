import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TodoTableComponent } from './components/table/table.component';
import { FooterComponent } from "./components/footer/footer.component";
import { DoneComponent } from "./components/done/done.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    ToolbarComponent,
    TodoTableComponent,
    FooterComponent,
    DoneComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Todo_V2');
}
