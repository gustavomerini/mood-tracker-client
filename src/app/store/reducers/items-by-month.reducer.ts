import { Action, createReducer, on } from '@ngrx/store';
import moment from 'moment';
import sortBy from 'lodash/sortBy';
import without from 'lodash/without';
import findIndex from 'lodash/findIndex';

import { TodoItemsByMonth, TodoItemModel } from '../models';
import { itemsByMonthActions } from '../actions';

export const key = 'itemsByMonth';

export interface State {
  items: Array<TodoItemsByMonth>;
}

export const initialState: State = {
  items: []
};

function findItemById(items: Array<TodoItemsByMonth>, id: number): TodoItemModel | undefined {
  for (const monthCollection of items) {
    const is = monthCollection.items;
    const res = is.find(i => i.id === id);
    if (res != null) {
      return res;
    }
  }
  return undefined;
}

// replace item at index and return new array
// if no replacement object remove item at index and return new array
function replaceAtIndex<T>(arr: T[], id: number, replacement?: T): Array<T> {
  if (replacement) {
    return [...arr.slice(0, id), replacement, ...arr.slice(id + 1)];
  }
  else {
    return [...arr.slice(0, id), ...arr.slice(id + 1)];
  }
}

function addOne(stateItems: Array<TodoItemsByMonth>, item: TodoItemModel): Array<TodoItemsByMonth> {
  const newET = moment(item.eventTime);
  const { months: newMonth, years: newYear } = newET.toObject();
  const collectionIdx = stateItems.findIndex(el => {
    return el.month.numerical === newMonth && el.year === newYear;
  });
  if (collectionIdx === -1) {
    const newMonthCollection: TodoItemsByMonth = {
      month: { numerical: newMonth, formatted: moment(item.eventTime).format('MMMM') },
      year: newYear,
      items: [item]
    };
    return [...stateItems, newMonthCollection];
  } else {
    const collection = { ...stateItems[collectionIdx] };
    collection.items = sortBy(
      [...collection.items, item],
      [i => moment(i.eventTime).valueOf()]
    );
    return replaceAtIndex(stateItems, collectionIdx, collection);
  }
}

function addOrReplaceOne(items: Array<TodoItemsByMonth>, item: TodoItemModel): Array<TodoItemsByMonth> {
  const newET = moment(item.eventTime);
  const { months: newMonth, years: newYear } = newET.toObject();

  const oldItem = findItemById(items, item.id);

  if (oldItem == null) {
    return addOne(items, item);
  }

  const oldET = moment(oldItem.eventTime);
  const { months: oldMonth, years: oldYear } = oldET.toObject();
  const sameMonthCollection = oldMonth === newMonth && oldYear === newYear;

  // old means current state that is being changed and col is collection
  // so the item that is being changed is in oldMonth's collection of items
  const oldMColIdx = findIndex(items, {
    month: { numerical: oldMonth },
    year: oldYear
  });

  const oldMCol = { ...items[oldMColIdx] };

  if (sameMonthCollection) {
    // if old and new time is in same moth, remove old item,
    // add new and sort by timestamp
    oldMCol.items = sortBy(
      [...without(oldMCol.items, oldItem), item],
      [i => moment(i.eventTime).valueOf()]
    );
    return replaceAtIndex(items, oldMColIdx, oldMCol);
  } else {
    oldMCol.items = without(oldMCol.items, oldItem);
    if (oldMCol.items.length === 0) {
      items = without(items, items[oldMColIdx]);
    } else {
      items = replaceAtIndex(items, oldMColIdx, oldMCol);
    }

    const newMColIdx = findIndex(items, {
      month: { numerical: newMonth },
      year: newYear
    });

    if (newMColIdx === -1) {
      items.push({
        month: { numerical: newMonth, formatted: newET.format('MMMM') },
        year: newYear,
        items: [item]
      });
      items = sortBy(items, ['year', i => i.month.numerical]);
    } else {
      const newMCol = { ...items[newMColIdx] };
      newMCol.items = sortBy(
        [...newMCol.items, item],
        [i => moment(i.eventTime).valueOf()]
      );
      items = replaceAtIndex(items, newMColIdx, newMCol);
    }
    return items;
  }
}

const itemsByMonthReducer = createReducer(
  initialState,

  on(itemsByMonthActions.load, (state, { items }) => {
    return {
      ...state,
      items: items.reduce((acc: Array<TodoItemsByMonth>, i) => {
        return addOne(acc, i);
      }, [])
    };
  }),

  on(itemsByMonthActions.addOrUpdateOne, (state, { item }) => {
    return {
      items: addOrReplaceOne(state.items, item)
    };
  })
);

export function reducer(state: State = initialState, action: Action) {
  return itemsByMonthReducer(state, action);
}
