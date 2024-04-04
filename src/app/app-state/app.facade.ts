import { Injectable, inject } from '@angular/core';
import { AppActions } from '@app-state';
import { Store, select } from '@ngrx/store';
import {
  IFormData,
  TOpmetGroupedResponse,
  TOpmetSuccessResponse,
} from '@ui-shared-models';
import * as AppSelectors from './app.selectors';

@Injectable({ providedIn: 'root' })
export class AppFacade {
  private _store = inject(Store);

  public readonly isLoading$ = this._store.pipe(select(AppSelectors.isLoading));
  public readonly error$ = this._store.pipe(select(AppSelectors.error));
  public readonly data$ = this._store.pipe(select(AppSelectors.data));

  setIsLoading(value: boolean) {
    this._store.dispatch(AppActions.setLoading({ value }));
  }

  submitData(data: IFormData) {
    this._store.dispatch(AppActions.submitFormData({ data }));
  }

  clearErrors() {
    this._store.dispatch(AppActions.clearErrors());
  }

  groupByStationID(data: TOpmetSuccessResponse): TOpmetGroupedResponse {
    const groupedData: TOpmetGroupedResponse = {};
    data.forEach((item) => {
      if (!groupedData[item.stationId]) {
        groupedData[item.stationId] = [];
      }
      groupedData[item.stationId].push(item);
    });
    return groupedData;
  }
}
