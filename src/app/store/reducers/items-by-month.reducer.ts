import { Action, createReducer, on } from "@ngrx/store";
import moment, { Moment } from "moment";
import sortBy from "lodash/sortBy";
import without from "lodash/without";

import { TodoItemsByMonth, TodoItemModel } from "../models";
import { itemsByMonthActions } from "../actions";

export const key = "itemsByMonth";

export interface State {
  items: Array<TodoItemsByMonth>;
}

export const initialState: State = {
  items: []
};

const findItemById = (state: State, id: number): TodoItemModel => {
  const items = state.items;
  let res: TodoItemModel;
  for (const ai of items) {
    const is = ai.items;
    res = is.find(i => i.id === id);
    if (res != undefined) {
      return res;
    }
  }
  return res;
};

const itemsByMonthReducer = createReducer(
  initialState,

  on(itemsByMonthActions.load, (state, { items }) => {
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

  on(itemsByMonthActions.updateOne, (state, { item }) => {
    const oldItem = findItemById(state, item.id);
    const oldET = moment(oldItem.eventTime);
    const newET = moment(item.eventTime);
    const { months: oldMonth, years: oldYear } = oldET.toObject();
    const { months: newMonth, years: newYear } = newET.toObject();
    const sameMonthCollection = oldMonth === newMonth && oldYear === newYear;

    let stateItems = [...state.items];

    const oldMColIdx = stateItems.findIndex(
      i => i.month.numerical === oldMonth && i.year === oldYear
    );
    const oldMCol = { ...stateItems[oldMColIdx] };

    if (sameMonthCollection) {
      oldMCol.items = sortBy(
        [...without(oldMCol.items, oldItem), item],
        [i => moment(i.eventTime).valueOf()]
      );
      return {
        items: [
          ...stateItems.slice(0, oldMColIdx),
          oldMCol,
          ...stateItems.slice(oldMColIdx + 1)
        ]
      };
    } else {
      oldMCol.items = without(oldMCol.items, oldItem);
      if (oldMCol.items.length === 0) {
        stateItems = without(stateItems, stateItems[oldMColIdx]);
      } else {
        stateItems = [
          ...stateItems.slice(0, oldMColIdx),
          oldMCol,
          ...stateItems.slice(oldMColIdx + 1)
        ];
      }

      const newMColIdx = stateItems.findIndex(
        i => i.month.numerical === newMonth && i.year === newYear
      );

      if (newMColIdx === -1) {
        stateItems = sortBy(
          [
            ...stateItems,
            {
              month: { numerical: newMonth, formatted: newET.format("MMMM") },
              year: newYear,
              items: [item]
            }
          ],
          ["year", i => i.month.numerical]
        );
      } else {
        const newMCol = { ...stateItems[newMColIdx] };
        newMCol.items = sortBy(
          [...newMCol.items, item],
          [i => moment(i.eventTime).valueOf()]
        );
        stateItems = [
          ...stateItems.slice(0, newMColIdx),
          newMCol,
          ...stateItems.slice(newMColIdx + 1)
        ];
      }
      return {
        items: stateItems
      };
    }
  })
);

export function reducer(state: State = initialState, action: Action) {
  return itemsByMonthReducer(state, action);
}
