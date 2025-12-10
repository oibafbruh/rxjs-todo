import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { map } from 'rxjs';

interface AppState {
  loading: boolean;
};

const initialState: AppState = {
  loading: false,
};

export const AppStore = signalStore(
    { providedIn: 'root' },

    withState(initialState),

    withProps(() => ({
        _snackBar: inject(MatSnackBar),
        _breakpoint: inject(BreakpointObserver),
    })),

    withProps(({ _breakpoint }) => ({
        isMobile: toSignal(
            _breakpoint.observe([
                '(max-width: 1300px)'
            ]).pipe(map(result => result.matches)),
            { initialValue: false }
        )
    })),

    withMethods(({ _snackBar, ...store }) => ({
        setLoading(isLoading: boolean) {
            patchState(store, { loading: isLoading });
        },
        showSnackbar(message: string) {
            _snackBar.open(message, 'Schließen', { 
                duration: 3000 });
        }
    }))
);

// withProps(() => ({
//     _snackBar: inject(MatSnackBar),
//     _breakpoint: inject(BreakpointObserver),
//   })),

//   // 2. Second 'withProps': Use the injected services
//   // The store (first arg) now contains '_breakpoint' from step 1
//   withProps((store) => ({
//     smallScreen: toSignal(
//       store._breakpoint.observe(['(max-width: 1300px)']).pipe(
//         map((result) => result.matches)
//       ),
//       { initialValue: false }
//     ),
//   }))
// );