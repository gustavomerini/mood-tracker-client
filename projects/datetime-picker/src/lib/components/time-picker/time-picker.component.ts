import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { TimeSerialized, TimeLimits } from '../../store';
import moment from 'moment';

@Component({
  selector: 'moods-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TimePickerComponent implements OnInit, OnChanges {
  constructor() { }

  @Input() time: TimeSerialized;
  @Input() disabled: boolean;

  @Input() timeLimits: TimeLimits = {
    min: { hour: 0, minute: 0 },
    max: { hour: 23, minute: 59 }
  };

  @Output() timeChange = new EventEmitter<Partial<TimeSerialized>>();

  minute: number;
  hour: number;

  minHour: number;
  maxHour: number;
  minMinute: number;
  maxMinute: number;

  onHourChange(hour: number) {
    this.timeChange.emit({ hour });
  }

  onMinuteChange(minute: number) {
    this.timeChange.emit({ minute });
  }

  ngOnInit(): void {
    this.setLimits();
    this.limit(this.time.hour, this.time.minute, this.timeLimits);
  }

  ngOnChanges(changes: SimpleChanges) {
    const timeLimits: TimeLimits = changes.timeLimits ? changes.timeLimits.currentValue : undefined;
    const time: TimeSerialized = changes.time ? changes.time.currentValue : undefined;
    if (time && timeLimits) {
      this.setLimits(timeLimits);
      this.limit(time.hour, time.minute, timeLimits);
    }
  }

  private limit(hour: number, minute: number, timeLimits: TimeLimits): void {
    const timeMs = this.timeToMs(hour, minute);
    const minTimeMs = this.timeToMs(timeLimits.min.hour, timeLimits.min.minute);
    const maxTimeMs = this.timeToMs(timeLimits.max.hour, timeLimits.max.minute);
    let l: { hour: number, minute: number};
    if (timeMs < minTimeMs) {
      l = timeLimits.min;
    } else if (timeMs > maxTimeMs) {
      l = timeLimits.max;
    }
    if (l != null) {
      this.hour = l.hour;
      this.minute = l.minute;
    } else {
      this.hour = hour;
      this.minute = minute;
    }
  }

  private timeToMs(hour: number, minute: number): number {
    return moment.duration(hour, 'hour').add(moment.duration(minute, 'minute')).asMilliseconds();
  }

  private setLimits(timeLimits?: TimeLimits) {
    timeLimits = timeLimits || this.timeLimits;
    this.minMinute = timeLimits.min.minute;
    this.maxMinute = timeLimits.max.minute;
    this.minHour = timeLimits.min.hour;
    this.maxHour = timeLimits.max.hour;
  }
}
