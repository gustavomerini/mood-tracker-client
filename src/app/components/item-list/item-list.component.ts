import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { TodoItemsByMonth, itemsByMonthSelectors, AppState } from "../../store";
import { ApplicationService } from "../../services";

@Component({
  selector: "moods-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ItemListComponent implements OnInit {
  itemsByMonth$: Observable<Array<TodoItemsByMonth>>;

  modalId = 1;

  constructor(
    private store: Store<AppState>,
    private appService: ApplicationService
  ) {}

  private modal = this.appService.modalInstance;

  ngOnInit(): void {
    this.itemsByMonth$ = this.store.select(itemsByMonthSelectors.selectItems);
  }

  onCalendarCancel() {
    console.log("cancel");
    this.modal.hide();
  }

  onCalendarOk(datetime: any) {
    console.log(datetime);
    this.modal.hide();
  }

  showCalendar() {
    this.modal.show();
  }
}
