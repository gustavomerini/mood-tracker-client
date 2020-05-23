import { ActionReducerMap } from '@ngrx/store';
import * as itemsByMonthReducer from './items-by-month.reducer';

export interface AppState {
  [itemsByMonthReducer.key]: itemsByMonthReducer.State;
  [key: string]: {};
}

export const appReducers: ActionReducerMap<AppState> = {
  [itemsByMonthReducer.key]: itemsByMonthReducer.reducer
};

export { itemsByMonthReducer };
