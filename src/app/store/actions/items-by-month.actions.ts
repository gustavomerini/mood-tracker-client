import { createAction, props } from "@ngrx/store";

import { TodoItemModel } from "../models";

export const loadItemsByMonth = createAction(
  "[ItemsByMonth] Load ItemsByMonth",
  props<{ items: Array<TodoItemModel> }>()
);
