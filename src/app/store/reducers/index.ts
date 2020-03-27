import { ActionReducerMap, State } from "@ngrx/store";
import * as itemsByMonthReducer from "./items-by-month.reducer";

export const appReducers: ActionReducerMap<{
  [key: string]: any;
}> = {
  [itemsByMonthReducer.key]: itemsByMonthReducer.reducer
};

export interface AppState {
  [itemsByMonthReducer.key]: itemsByMonthReducer.State;
  [key: string]: {};
}

export { itemsByMonthReducer };
