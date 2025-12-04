import { Component, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SideComponent } from './components/sidenav/sidenav.component';
import { TodoTableComponent } from './components/table/table.component';
import { FooterComponent } from "./components/footer/footer.component";
import { DoneComponent } from './components/done/done.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BreakpointService } from './services/breakpoint.service';
import { ActionToolbarComponent } from "./components/toolbar/toolbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    SideComponent,
    TodoTableComponent,
    FooterComponent,
    DoneComponent,
    MatSidenavModule,
    MatSnackBarModule,
    ActionToolbarComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private breakpointService = inject(BreakpointService);
  isMobile = this.breakpointService.isMobile;
}