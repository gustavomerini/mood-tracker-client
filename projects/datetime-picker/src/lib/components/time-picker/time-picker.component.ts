import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";

import { TimeSerialized } from "../../store";

@Component({
  selector: "moods-time-picker",
  templateUrl: "./time-picker.component.html",
  styleUrls: ["./time-picker.component.scss"],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TimePickerComponent implements OnInit {
  constructor() {}
  @Input() time: TimeSerialized;
  @Output() timeChange = new EventEmitter<Partial<TimeSerialized>>();

  private cachedMinute: number;
  private cachedHour: number;

  onHourChange(hour: number) {
    if(hour !== this.cachedHour) {
      this.timeChange.emit({ hour: hour });
      this.cachedHour = hour;
    }
  }

  onMinuteChange(minute: number) {
    if(minute !== this.cachedMinute) {
      this.timeChange.emit({ minute: minute });
      this.cachedMinute = minute;
    }
  }

  ngOnInit(): void {}
}
