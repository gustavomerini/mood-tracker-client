import { Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { ofEntityOp, EntityOp } from "@ngrx/data";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { TodoItemsByMonth } from "../models";
import { itemsByMonthActions } from "../actions";

@Injectable()
export class ItemsByMonthEffects {
  constructor(private actions$: Actions) {
    this.actions$.subscribe(a => console.log("action from effects", a));
  }

  items$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofEntityOp(EntityOp.QUERY_ALL_SUCCESS),
      map(action =>
        itemsByMonthActions.loadItemsByMonth({ items: action.payload.data })
      )
    );
  });
}
