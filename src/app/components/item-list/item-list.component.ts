import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TodoItemsByMonth, itemsByMonthSelectors, AppState } from '../../store';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'moods-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ItemListComponent {
  itemsByMonth$: Observable<TodoItemsByMonth[]>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.itemsByMonth$ = this.route.queryParams.pipe(mergeMap((params) => {
      if (params.past === 'true') {
        return this.store.select(itemsByMonthSelectors.selectPast);
      }
      return this.store.select(itemsByMonthSelectors.selectFuture);
    }));
  }
}
