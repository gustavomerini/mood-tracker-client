import { Action, createReducer, on } from "@ngrx/store";
import moment, { Moment } from "moment";

import {
  DatetimeSerialized,
  TimeSerialized,
  MonthSerialized,
  DatetimeObject,
  MonthObject
} from "../models";
import { calendarActions as actions } from "../actions";

export const key = "calendar";

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
  on(actions.reset, _ => {
    const m = moment();
    return {
      selectedDate: new DatetimeObject(m).serialized,
      month: new MonthObject(m).serialized
    };
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
        date: date
      }
    };
  }),
  on(actions.selectTime, (state, time: Partial<TimeSerialized>) => {
    return {
      ...state,
      selectedDate: {
        ...state.selectedDate,
        hour: time.hour ? time.hour : state.selectedDate.hour,
        minute: time.minute ? time.minute : state.selectedDate.minute
      }
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return calendarReducer(state, action);
}
