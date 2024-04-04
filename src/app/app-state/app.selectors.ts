import { AppState } from '@app-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getState = createFeatureSelector<AppState>('app');

export const isLoading = createSelector(
  getState,
  (state: AppState) => state.isLoading
);

export const error = createSelector(getState, (state: AppState) => state.error);

export const data = createSelector(getState, (state: AppState) => state.data);
