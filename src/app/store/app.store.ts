import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../models/todo.model';
import { TodoFilters } from '../models/todo-filters.model';
import { TodoDataService } from '../services/todo-data.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

type AppState = {
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