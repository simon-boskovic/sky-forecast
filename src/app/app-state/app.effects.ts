import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AppActions, AppFacade } from '@app-state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IOpmetQuery, IOpmetResponse } from '@ui-shared-models';
import { ApiService } from '@ui-shared-services';
import { catchError, finalize, map, of, switchMap, tap } from 'rxjs';

const API_URL = 'https://ogcie.iblsoft.com/ria/opmetquery';

@Injectable()
export class AppEffects {
  private _actions$ = inject(Actions);
  private _appFacade = inject(AppFacade);
  private _apiService = inject(ApiService);

  private _requestCount = 1;

  public createBriefing$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AppActions.submitFormData),
      tap(() => {
        this._appFacade.setIsLoading(true);
        this._appFacade.clearErrors();
      }),
      switchMap(({ data }) => {
        const { countries, reportTypes, stations } = data;

        const query: IOpmetQuery = {
          id: `query-${this._requestCount}`,
          method: 'query',
          params: [
            {
              id: `briefing-${this._requestCount}`,
              reportTypes,
            },
          ],
        };

        if (!!countries.length) {
          query.params[0].countries = countries;
        }
        if (!!stations.length) {
          query.params[0].stations = stations;
        }

        return this._apiService.post<IOpmetResponse>(API_URL, query).pipe(
          map((res) => {
            if (res.error) {
              return AppActions.loadError({ error: { error: res.error } });
            }

            return AppActions.loadSuccess({
              data: this._appFacade.groupByStationID(res.result),
            });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              AppActions.loadError({
                error: {
                  error: {
                    code: HttpStatusCode.InternalServerError,
                    message: error.message,
                    data: null,
                  },
                },
              })
            );
          }),
          finalize(() => {
            this._requestCount = this._requestCount + 1;
            this._appFacade.setIsLoading(false);
          })
        );
      })
    )
  );
}
