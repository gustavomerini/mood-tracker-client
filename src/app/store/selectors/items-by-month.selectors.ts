import { createSelector, Selector, MemoizedSelector } from '@ngrx/store';
import { AppState, itemsByMonthReducer } from '../reducers';
import { TodoItemsByMonth, TodoItemModel } from '../models';
import moment from 'moment';

function filterItems(
  items: TodoItemsByMonth[],
  identity: (todoItem: TodoItemModel) => boolean
): TodoItemsByMonth[]
{
  let res: TodoItemsByMonth[] = [];
  for (const mCol of items) {
    const mItems = mCol.items.filter(identity);
    if (mItems.length > 0) {
      res = [...res, { ...mCol, items: mItems }];
    }
  }
  return res;
}

export const select: Selector<AppState, itemsByMonthReducer.State> = (
  state: AppState
) => state[itemsByMonthReducer.key];

export const selectFuture: MemoizedSelector<
  AppState,
  Array<TodoItemsByMonth>
> = createSelector(
  select,
  (state: itemsByMonthReducer.State) => {
    return filterItems(state.items, (todoItem) => {
      const eventDatetime = moment(todoItem.eventTime);
      const now = moment();
      if (eventDatetime.isBefore(now)) {
        return false;
      }
      return true;
    });
  }
);

export const selectPast: MemoizedSelector<
  AppState,
  Array<TodoItemsByMonth>
> = createSelector(
  select,
  (state: itemsByMonthReducer.State) => {
    return filterItems(state.items, (todoItem) => {
      const eventDatetime = moment(todoItem.eventTime);
      const now = moment();
      if (eventDatetime.isSameOrAfter(now)) {
        return false;
      }
      return true;
    });
  }
);
