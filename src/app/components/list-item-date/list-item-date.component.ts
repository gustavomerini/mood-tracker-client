import moment, { Moment } from "moment";
import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "moods-list-item-date",
  templateUrl: "./list-item-date.component.html",
  styleUrls: ["./list-item-date.component.scss"],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ListItemDateComponent implements OnInit {
  @Input() eventTime: string;

  private _date: Moment;

  day: number;
  dayOfWeek: string;
  hour: number;
  minute: number;

  constructor() {}

  ngOnInit(): void {
    this._date = moment(this.eventTime);

    this.day = this._date.date();
    this.dayOfWeek = this._date.format("ddd");
    this.hour = this._date.hour();
    this.minute = this._date.minute();
  }
}
