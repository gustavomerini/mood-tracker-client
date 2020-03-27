import {
  createFeatureSelector,
  createSelector,
  Selector,
  MemoizedSelector,
  State
} from "@ngrx/store";
import { AppState, itemsByMonthReducer } from "../reducers";
import { TodoItemsByMonth } from "../models";

export const select: Selector<AppState, itemsByMonthReducer.State> = (
  state: AppState
) => state[itemsByMonthReducer.key];

export const selectItems: MemoizedSelector<
  AppState,
  Array<TodoItemsByMonth>
> = createSelector(select, (state: itemsByMonthReducer.State) => state.items);
