import { Component, OnInit } from '@angular/core';
import { DatetimeSerialized } from 'datetime-picker';

@Component({
  selector: 'moods-dt-test',
  templateUrl: './dt-test.component.html',
  styleUrls: ['./dt-test.component.scss']
})
export class DtTestComponent implements OnInit {

  open = false;

  datetime: DatetimeSerialized = {
    year: 2020,
    month: 7,
    date: 25,
    hour: 23,
    minute: 1
  };

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.open = !this.open;
  }

  onCalendarCancel() {
    this.open = false;
  }

  onCalendarOk(datetime: DatetimeSerialized) {
    console.log('datetime ok', datetime);
    this.open = false;
    // this.datetime = datetime;
  }
}
