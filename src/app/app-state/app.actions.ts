import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  IFormData,
  TOpmetErrorResponse,
  TOpmetGroupedResponse,
} from '@ui-shared-models';

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'Set loading': props<{ value: boolean }>(),
    'Submit Form Data': props<{ data: IFormData }>(),
    'Load success': props<{ data: TOpmetGroupedResponse }>(),
    'Load error': props<{ error: TOpmetErrorResponse }>(),
    'Clear errors': emptyProps(),
  },
});
