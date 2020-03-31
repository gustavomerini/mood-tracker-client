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
  }),

  on(itemsByMonthActions.updateItemByMonth, (state, { item }) => {
    const date: Moment = moment(item.eventTime);
    const monthNum = date.month();
    const yearNum = date.year();
    const monthIdx: number = state.items.findIndex(
      i => i.month.numerical === monthNum && i.year === yearNum
    );
    const monthItem: TodoItemsByMonth = state.items[monthIdx];
    const itemIdx: number = monthItem.items.findIndex(i => i.id === item.id);
    return {
      items: [
        ...state.items.slice(0, monthIdx),
        {
          ...state.items[monthIdx],
          items: [
            ...monthItem.items.slice(0, itemIdx),
            item,
            ...monthItem.items.slice(itemIdx + 1)
          ]
        },
        ...state.items.slice(monthIdx + 1)
      ]
    };
  })
);

export function reducer(state: State = initialState, action: Action) {
  return itemsByMonthReducer(state, action);
}
