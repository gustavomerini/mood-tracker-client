import { Action, createReducer, on } from '@ngrx/store';
import moment from 'moment';

import {
  DatetimeSerialized,
  MonthSerialized,
  DatetimeObject,
  MonthObject
} from '../models';
import { calendarActions as actions } from '../actions';

export const key = 'calendar';

export interface State {
  selectedDate: DatetimeSerialized;
  month: MonthSerialized;
}

export const initialState: State = {
  selectedDate: undefined,
  month: undefined
};

const calendarReducer = createReducer(
  initialState,
  on(actions.reset, (_, { dt: datetime }: { dt: DatetimeSerialized }) => {
    const m = datetime ? undefined : moment();
    const dt: DatetimeSerialized = m
      ? new DatetimeObject(m).serialized
      : datetime;
    const month: MonthSerialized = m
      ? new MonthObject(m).serialized
      : new MonthObject(moment({ month: dt.month, year: dt.year })).serialized;
    const newState = {
      selectedDate: dt,
      month
    };
    return newState;
  }),
  on(actions.nextMonth, state => {
    const currentMonth = new MonthObject(
      moment({ year: state.month.year, month: state.month.numerical })
    );
    return { ...state, month: currentMonth.getNextMonth().serialized };
  }),
  on(actions.prevMonth, state => {
    const currentMonth = new MonthObject(
      moment({ year: state.month.year, month: state.month.numerical })
    );
    return { ...state, month: currentMonth.getPrevMonth().serialized };
  }),
  on(actions.selectDate, (state, { date }: { date: number }) => {
    return {
      ...state,
      selectedDate: {
        ...state.selectedDate,
        month: state.month.numerical,
        year: state.month.year,
        date
      }
    };
  }),
  on(actions.selectTime, (state, { hour, minute }) => {
    return {
      ...state,
      selectedDate: {
        ...state.selectedDate,
        hour: hour ? hour : state.selectedDate.hour,
        minute: minute ? minute : state.selectedDate.minute
      }
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return calendarReducer(state, action);
}
