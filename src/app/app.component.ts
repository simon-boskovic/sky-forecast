import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AppFacade } from '@app-state';
import {
  FlightBriefingFormComponent,
  FlightBriefingTableComponent,
  LayoutComponent,
} from '@ui-components';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    LayoutComponent,
    FlightBriefingFormComponent,
    FlightBriefingTableComponent,
    AsyncPipe,
    MatSnackBarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private _appFacade = inject(AppFacade);
  private _snackBar = inject(MatSnackBar);
  private _destroy$ = new Subject<void>();

  protected isLoading$ = this._appFacade.isLoading$;
  protected data$ = this._appFacade.data$;

  ngOnInit() {
    this._appFacade.error$
      .pipe(
        filter((x) => !!x),
        takeUntil(this._destroy$)
      )
      .subscribe((message) => {
        this._snackBar.open(message, 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
  }
}
