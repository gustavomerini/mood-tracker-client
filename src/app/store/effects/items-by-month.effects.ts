import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { ofEntityOp, EntityOp, EntityAction } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { itemsByMonthActions } from '../actions';

@Injectable()
export class ItemsByMonthEffects {
  constructor(private actions$: Actions) { }

  loadItems$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofEntityOp(EntityOp.QUERY_ALL_SUCCESS),
      map((action: EntityAction) =>
        itemsByMonthActions.load({
          items: action.payload.data
        })
      )
    )
  );

  addOrUpdateItem$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofEntityOp(EntityOp.SAVE_UPDATE_ONE_SUCCESS),
      map(action => {
        return itemsByMonthActions.addOrUpdateOne({
          item: action.payload.data.changes
        });
      })
    )
  );

  addItem$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofEntityOp(EntityOp.SAVE_ADD_ONE_SUCCESS),
      map(action => {
        return itemsByMonthActions.addOrUpdateOne({
          item: action.payload.data
        });
      })
    )
  );
}
