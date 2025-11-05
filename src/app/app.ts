import { AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TodoTableComponent } from './components/table/table.component';
import { FooterComponent } from "./components/footer/footer.component";
import { DoneComponent } from './components/done/done.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from "rxjs/operators";
import { Subscription} from "rxjs";

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
  isMobile = false;
  private breakpointSub!: Subscription;

  private breakpointObserver = inject(BreakpointObserver);
  private cdr = inject(ChangeDetectorRef);

  ngAfterViewInit() {
    this.breakpointSub = this.breakpointObserver.observe([
      "(max-width: 900px)"
    ]).pipe(
      map(result => result.matches)
    )
    .subscribe(isMobileResult => {
      this.isMobile = isMobileResult;
      //console.log("app.ts: isMobile = " + this.isMobile); //Debug
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.breakpointSub) {
      this.breakpointSub.unsubscribe();
    }
  }
}