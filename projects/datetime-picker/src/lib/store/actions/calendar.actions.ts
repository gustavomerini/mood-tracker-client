import { createAction, props } from '@ngrx/store';
import { TimeSerialized, DatetimeSerialized } from '../models';

export const reset = createAction(
  '[Calendar] reset',
  props<{ dt: DatetimeSerialized }>()
);

export const nextMonth = createAction('[Calendar] Next month');

export const prevMonth = createAction('[Calendar] Previous month');

export const selectDate = createAction(
  '[Calendar] Select date',
  props<{ date: number }>()
);

export const selectTime = createAction(
  '[Calendar] Select time',
  props<{ [prop in keyof TimeSerialized]?: TimeSerialized[prop] }>()
);
