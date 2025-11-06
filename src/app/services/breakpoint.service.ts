import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  
  private breakpointObserver = inject(BreakpointObserver);

  readonly isMobile$ = this.breakpointObserver.observe([
    '(max-width: 900px)'
  ]).pipe(
    map(result => result.matches),
    shareReplay(1)
  );
}
