import { createFeatureSelector, createSelector } from "@ngrx/store";
import { calendarReducer } from "../reducers";
import { MonthSerialized, DatetimeSerialized, TimeSerialized } from "../models";
import { pick } from "../../util";

type State = calendarReducer.State;

export const select = createFeatureSelector(calendarReducer.key);

export const month = createSelector(select, (state: State) => state.month);

export const dates = createSelector(
  month,
  (month: MonthSerialized): Array<number> => month.dates
);

export const selectedDate = createSelector(
  select,
  (state: State): DatetimeSerialized => state.selectedDate
);

export const isSelectedDate = createSelector(
  month,
  selectedDate,
  (
    month: MonthSerialized,
    selected: DatetimeSerialized,
    props: { date: number }
  ): boolean =>
    month.year === selected.year &&
    month.numerical === selected.month &&
    props.date === selected.date
);

export const selectedTime = createSelector(
  selectedDate,
  (date: DatetimeSerialized): TimeSerialized => pick(date, "hour", "minute")
);
