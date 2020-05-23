import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TodoItemsByMonth, itemsByMonthSelectors, AppState } from '../../store';

@Component({
  selector: 'moods-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ItemListComponent {
  itemsByMonth$: Observable<Array<TodoItemsByMonth>> = this.store.select(
    itemsByMonthSelectors.selectItems
  );

  constructor(private store: Store<AppState>) {}
}
