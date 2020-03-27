import { Action, createReducer, on } from "@ngrx/store";
import moment, { Moment } from "moment";

import { TodoItemsByMonth } from "../models";
import { itemsByMonthActions } from "../actions";

export const key = "itemsByMonth";

export interface State {
  items: Array<TodoItemsByMonth>;
}

export const initialState: State = {
  items: []
};

const itemsByMonthReducer = createReducer(
  initialState,

  on(itemsByMonthActions.loadItemsByMonth, (state, { items }) => {
    return {
      ...state,
      items: items.reduce((acc: Array<TodoItemsByMonth>, i) => {
        const date: Moment = moment(i.eventTime);
        const monthNum = date.month();
        const yearNum = date.year();
        const monthCollection = acc.find(el => {
          return el.month.numerical === monthNum && el.year === yearNum;
        });
        if (monthCollection == null) {
          const newMonthCollection: TodoItemsByMonth = {
            month: { numerical: monthNum, formatted: date.format("MMMM") },
            year: yearNum,
            items: [i]
          };
          acc = [...acc, newMonthCollection];
        } else {
          monthCollection.items = [...monthCollection.items, i];
        }
        return acc;
      }, [])
    };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return itemsByMonthReducer(state, action);
}
