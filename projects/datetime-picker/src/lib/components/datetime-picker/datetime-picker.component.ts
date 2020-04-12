import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
  Input
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable, BehaviorSubject, Subscription, Subscriber } from "rxjs";
import { take } from "rxjs/operators";
import moment from "moment";

import {
  calendarActions,
  calendarReducer,
  MonthSerialized,
  DatetimeSerialized,
  TimeSerialized,
  calendarSelectors,
  DatetimeObject
} from "../../store";

@Component({
  selector: "moods-datetime-picker",
  templateUrl: "./datetime-picker.component.html",
  styleUrls: ["./datetime-picker.component.scss"],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatetimePickerComponent implements OnInit, OnDestroy {
  month$: Observable<MonthSerialized> = this.store.pipe(
    select(calendarSelectors.month)
  );
  dates$: Observable<Array<number>> = this.store.pipe(
    select(calendarSelectors.dates)
  );
  selectedDatetime$: Observable<DatetimeSerialized> = this.store.pipe(
    select(calendarSelectors.selectedDate)
  );
  selectedTime$: Observable<TimeSerialized> = this.store.pipe(
    select(calendarSelectors.selectedTime)
  );

  dayLabels = moment.weekdaysMin();

  @Output() datetimeSubmit = new EventEmitter<DatetimeSerialized>();
  @Output() cancel = new EventEmitter<undefined>();

  @Input() datetimeInit = new DatetimeObject(moment()).serialized;
  @Input() resetOnAction = true;

  private datetime = new BehaviorSubject<DatetimeSerialized>(null);
  private dtSub: Subscription;

  constructor(private store: Store<{ calendar: calendarReducer.State }>) {}

  private actionSub: Subscriber<any> = new Subscriber(() => {
    if (this.resetOnAction) this.dispatchReset();
  });

  ngOnInit(): void {
    this.dispatchReset();
    this.dtSub = this.selectedDatetime$.subscribe(datetime =>
      this.datetime.next(datetime)
    );
    this.datetimeSubmit.subscribe(this.actionSub);
    this.cancel.subscribe(this.actionSub);
  }

  isSelected$(date: number): Observable<boolean> {
    return this.store.pipe(
      select(calendarSelectors.isSelectedDate, { date: date }),
      take(1)
    );
  }

  onTimeChange(time: Partial<TimeSerialized>) {
    this.store.dispatch(calendarActions.selectTime(time));
  }

  showNext() {
    this.store.dispatch(calendarActions.nextMonth());
  }

  showPrev() {
    this.store.dispatch(calendarActions.prevMonth());
  }

  selectDate(date: number) {
    this.store.dispatch(calendarActions.selectDate({ date: date }));
  }

  onOk() {
    this.datetimeSubmit.emit(this.datetime.value);
  }

  onCancel() {
    this.cancel.emit();
  }

  ngOnDestroy(): void {
    this.dtSub.unsubscribe();
    this.actionSub.unsubscribe();
  }

  private dispatchReset(): void {
    this.store.dispatch(calendarActions.reset({ dt: this.datetimeInit }));
  }
}
