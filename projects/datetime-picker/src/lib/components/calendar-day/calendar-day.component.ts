import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'moods-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CalendarDayComponent implements OnInit {
  @Input() day: number;

  @HostBinding('class.selected')
  @Input() selected = false;

  @HostBinding('class.disabled')
  @Input() disabled = false;

  constructor() {}

  ngOnInit(): void {}
}
