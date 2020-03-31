import { createAction, props } from "@ngrx/store";

import { TodoItemModel } from "../models";

export enum ItemsByMonthOp {
  LOAD_ALL = "[ibm] load all",
  UPDATE_ONE = "[ibm] update one"
}

export const loadItemsByMonth = createAction(
  ItemsByMonthOp.LOAD_ALL,
  props<{ items: Array<TodoItemModel> }>()
);

export const updateItemByMonth = createAction(
  ItemsByMonthOp.UPDATE_ONE,
  props<{ item: TodoItemModel }>()
);
