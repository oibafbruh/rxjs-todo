import { Component, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SideComponent } from './components/sidenav/sidenav.component';
import { TodoTableComponent } from './components/table/table.component';
import { FooterComponent } from "./components/footer/footer.component";
import { DoneComponent } from './components/done/done.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActionToolbarComponent } from "./components/toolbar/toolbar.component";
import { AppStore } from './store/app.store';

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
    MatProgressSpinnerModule,
    ActionToolbarComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  AppStore = inject(AppStore);
  isMobile = this.AppStore.isMobile;
  isLoading = this.AppStore.loading;
}