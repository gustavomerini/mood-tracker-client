import { createAction, props } from '@ngrx/store';

import { TodoItemModel } from '../models';

export enum ItemsByMonthOp {
  LOAD_ALL = '[ibm] load all',
  ADD_OR_UPDATE_ONE = '[ibm] update one'
}

export const load = createAction(
  ItemsByMonthOp.LOAD_ALL,
  props<{ items: Array<TodoItemModel> }>()
);

export const addOrUpdateOne = createAction(
  ItemsByMonthOp.ADD_OR_UPDATE_ONE,
  props<{ item: TodoItemModel }>()
);
