import { AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SideComponent } from './components/sidenav/sidenav.component';
import { TodoTableComponent } from './components/table/table.component';
import { FooterComponent } from "./components/footer/footer.component";
import { DoneComponent } from './components/done/done.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointService } from './services/breakpoint.service';
import { AsyncPipe } from '@angular/common'

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
    AsyncPipe
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private breakpointService = inject(BreakpointService);
  isMobile$ = this.breakpointService.isMobile$;
}