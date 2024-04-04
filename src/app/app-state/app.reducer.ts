import { AppActions } from '@app-state-actions';
import { TOpmetGroupedResponse } from '@app/shared/models';
import { createReducer, on } from '@ngrx/store';

export interface AppState {
  isLoading: boolean;
  error?: string | null;
  data?: TOpmetGroupedResponse;
}

export const initialState: AppState = {
  isLoading: false,
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.setLoading, (state, { value }) => ({
    ...state,
    isLoading: value,
  })),
  on(AppActions.loadError, (state, { error }) => ({
    ...state,
    data: null,
    error: error.error?.message || 'Unexpected error occurred',
  })),
  on(AppActions.clearErrors, (state) => ({
    ...state,
    error: null,
  })),
  on(AppActions.loadSuccess, (state, { data }) => ({
    ...state,
    data,
  }))
);
