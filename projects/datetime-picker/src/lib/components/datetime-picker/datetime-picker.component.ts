import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscriber } from 'rxjs';
import { take, map, mergeMap } from 'rxjs/operators';
import moment from 'moment';

import {
  calendarActions,
  calendarReducer,
  MonthSerialized,
  DatetimeSerialized,
  TimeSerialized,
  calendarSelectors,
  DatetimeObject,
  TimeLimits,
} from '../../store';

@Component({
  selector: 'moods-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
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

  @Input() datetime: DatetimeSerialized;

  // Offset in minutes for initial datetime in case no input is set (now + 15 minutes)
  // when disablePast is true, it will be used for comparision
  //  - all dates before now + 15 minutes are disabled
  @Input() minuteOffset = 15;

  disabledCurrent$: Observable<boolean> = this.selectedDatetime$.pipe(
    mergeMap((datetime) => {
      const date = datetime.date;
      return this.disabledPast$(date).pipe(
        map((is) => is)
      );
    })
  );

  timeLimits$: Observable<TimeLimits> = this.selectedDatetime$.pipe(
    mergeMap((datetime) => {
      const date = datetime.date;
      return this.compareDate$(date).pipe(
        map((res: -1 | 0 | 1) => {
          const defaultLimits: TimeLimits = {
            min: { hour: 0, minute: 0 },
            max: { hour: 23, minute: 59 }
          };
          if (this.disablePast && res === 0) {
            const n = moment().add(15, 'minutes');
            return {
              min: { hour: n.hour(), minute: n.minute() },
              max: { hour: 23, minute: 59 }
            };
          }
          return defaultLimits;
        })
      );
    })
  );

  @Input() disablePast = false;

  private dt: DatetimeSerialized;

  private dtSub = new Subscriber<DatetimeSerialized>(datetime => {
    this.dt = datetime;
  });

  constructor(private store: Store<{ calendar: calendarReducer.State }>) { }

  ngOnInit(): void {
    if (this.datetime == null) {
      const n = moment().add(this.minuteOffset, 'minutes');
      this.dt = new DatetimeObject(n).serialized;
    } else {
      this.dt = this.datetime;
    }
    this.dispatchReset();
    this.selectedDatetime$.subscribe(this.dtSub);
  }

  isSelected$(date: number): Observable<boolean> {
    return this.store.pipe(
      select(calendarSelectors.isSelectedDate, { date }),
      take(1)
    );
  }

  disabledPast$(date: number): Observable<boolean> {
    return this.compareDate$(date).pipe(
      map((res: -1 | 0 | 1) => {
        if (this.disablePast) {
          return res === -1;
        }
        return false;
      })
    );
  }

  private compareDate$(date: number): Observable<-1 | 0 | 1> {
    return this.month$.pipe(
      map((m) => {
        const n = moment().add(this.minuteOffset, 'minutes');
        const dtMoment = moment({ year: m.year, month: m.numerical, date });
        if (n.isSame(dtMoment, 'date')) {
          return 0;
        }
        const isBefore = n.isAfter(moment({ year: m.year, month: m.numerical, date }), 'date');
        return isBefore ? -1 : 1;
      })
    );
  }

  setDatetime(datetime: DatetimeSerialized) {
    this.store.dispatch(calendarActions.reset({ dt: datetime }));
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
    this.store.dispatch(calendarActions.selectDate({ date }));
  }

  onOk() {
    this.datetimeSubmit.emit(this.dt);
  }

  onCancel() {
    this.cancel.emit();
  }

  ngOnDestroy(): void {
    this.dtSub.unsubscribe(); // setting datetime subject
  }

  private dispatchReset(): void {
    const dt = this.dt;
    this.store.dispatch(calendarActions.reset({ dt }));
  }
}
