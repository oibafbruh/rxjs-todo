import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, signal, ViewChild } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TodoTableComponent } from './components/table/table.component';
import { FooterComponent } from "./components/footer/footer.component";
import { DoneComponent } from './components/done/done.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from "rxjs/operators";
import { Observable, Subscription} from "rxjs";
import { AsyncPipe } from '@angular/common';
import { fromReadableStreamLike } from 'rxjs/internal/observable/innerFrom';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    ToolbarComponent,
    TodoTableComponent,
    FooterComponent,
    DoneComponent,
    MatSidenavModule
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile: boolean = false;
  private breakpointSub!: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef 
  ) {
  }

  ngAfterViewInit() {
    this.breakpointSub = this.breakpointObserver.observe([
      "(max-width: 900px)"
    ]).pipe(
      map(result => result.matches)
    )
    .subscribe(isMobileResult => {
      this.isMobile = isMobileResult;
      console.log("app.ts: isMobile = " + this.isMobile);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.breakpointSub) {
      this.breakpointSub.unsubscribe();
    }
  }
}