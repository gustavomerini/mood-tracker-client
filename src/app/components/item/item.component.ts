import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { Router } from "@angular/router";
import {
  DatetimeSerialized,
  stringToDatetime,
  datetimeToString
} from "datetime-picker";
import { Subject, BehaviorSubject, Subscriber } from "rxjs";

import { TodoItemModel } from "../../store/models";
import { ViewManagementService } from "../../services/view-management.service";
import { ItemService } from "../../services/item.service";

type Action = {
  action: "show" | "cancel" | "ok";
  datetime?: DatetimeSerialized;
};

@Component({
  selector: "moods-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() item: TodoItemModel;

  private eventDatetime$$ = new BehaviorSubject<DatetimeSerialized>(undefined);
  private updateEventDatetime() {
    this.eventDatetime$$.next(stringToDatetime(this.item.eventTime));
  }
  eventDatetime$ = this.eventDatetime$$.asObservable();

  modalViewId: number;
  modal = this.viewService.modal;

  private calendarAction = new Subject<Action>();
  private actionSub = new Subscriber<Action>(a => {
    if (a.action === "show") {
      this.modal.show(this.modalViewId);
      this.updateEventDatetime();
      return;
    }
    if (a.action === "ok") {
      const dts = datetimeToString(a.datetime);
      const updateData = { id: this.item.id, eventTime: dts };
      this.itemService.update(updateData);
    }
    this.modal.hide();
  });

  constructor(
    private router: Router,
    private viewService: ViewManagementService,
    private itemService: ItemService
  ) {
    this.calendarAction.subscribe(this.actionSub);
  }

  toEdit() {
    this.router.navigate(["edit", this.item.id]);
  }

  onCalendarOk(dt: DatetimeSerialized) {
    this.calendarAction.next({ action: "ok", datetime: dt });
  }

  onCalendarCancel() {
    this.calendarAction.next({ action: "cancel" });
  }

  showCalendar() {
    this.calendarAction.next({ action: "show" });
  }

  ngOnInit(): void {
    this.modalViewId = 100 + this.item.id;
  }
  ngOnDestroy() {
    this.actionSub.unsubscribe();
  }

  ngAfterViewInit() {}
}
