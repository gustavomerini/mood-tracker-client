import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Store, createSelector } from "@ngrx/store";
import { Observable } from "rxjs";

import { TodoItemsByMonth, itemsByMonthSelectors, AppState } from "../../store";

@Component({
  selector: "moods-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ItemListComponent implements OnInit {
  itemsByMonth$: Observable<Array<TodoItemsByMonth>>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.itemsByMonth$ = this.store.select(itemsByMonthSelectors.selectItems);
  }
}
