import moment, { Moment } from "moment";
import { range } from "../util";

export interface Serialized {
  readonly [key: string]: number | string | Array<number> | Serialized;
}

export interface ISerializable {
  serialized: Serialized;
}

export interface DatetimeSerialized extends Serialized {
  readonly year: number;
  readonly month: number;
  readonly date: number;
  readonly hour: number;
  readonly minute: number;
}

export type TimeSerialized = Pick<DatetimeSerialized, "hour" | "minute">;

export class DatetimeObject implements ISerializable {
  readonly year: number;
  readonly month: number;
  readonly date: number;
  readonly hour: number;
  readonly minute: number;

  constructor(
    moment: Moment,
    mo?: undefined,
    da?: undefined,
    ho?: undefined,
    mi?: undefined
  );
  constructor(
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number
  );
  constructor(
    yearOrMoment: number | Moment,
    month: number,
    day: number,
    hour: number,
    minute: number
  ) {
    if (typeof yearOrMoment === "number") {
      this.year = yearOrMoment;
      this.month = month;
      this.date = day;
      this.hour = hour;
      this.minute = minute;
    } else {
      const obj = yearOrMoment.toObject();
      this.year = obj.years;
      this.month = obj.months;
      this.date = obj.date;
      this.hour = obj.hours;
      this.minute = obj.minutes;
    }
  }

  get serialized(): DatetimeSerialized {
    return { ...(this as any) };
  }
}

export function stringToDatetime(s: string): DatetimeSerialized {
  return new DatetimeObject(moment(s)).serialized;
}

export function datetimeToString(dt: DatetimeSerialized): string {
  return moment(dt).format();
}

export interface MonthSerialized extends Serialized {
  readonly numerical: number;
  readonly year: number;
  readonly formatted: string;
  readonly padBegin: Array<number>;
  readonly dates: Array<number>;
  readonly padEnd: Array<number>;
}

export class MonthObject implements ISerializable {
  readonly numerical: number;
  readonly year: number;
  readonly padBegin: Array<number>;
  readonly dates: Array<number>;
  readonly padEnd: Array<number>;

  private _d: Moment;

  constructor(d: Moment) {
    this._d = d.clone();
    this.numerical = this._d.month();
    this.year = this._d.year();
    this.dates = range(this._d.daysInMonth(), 1);

    const pMonthDays = this._d.clone().subtract(1, "month").daysInMonth();
    const firstDay = this._d.clone().startOf("month").day();
    const lastDay = this._d.clone().endOf("month").day();
    this.padBegin = range(firstDay)
      .reverse()
      .map(i => pMonthDays - i);
    this.padEnd = range(moment.weekdays().length - 1 - lastDay).map(i => i + 1);
  }

  get formatted(): string {
    return this._d.format("MMMM");
  }

  getPrevMonth(): MonthObject {
    return new MonthObject(this._d.clone().subtract(1, "month"));
  }

  getNextMonth(): MonthObject {
    return new MonthObject(this._d.clone().add(1, "month"));
  }

  get serialized(): MonthSerialized {
    return {
      numerical: this.numerical,
      year: this.year,
      formatted: this.formatted,
      padBegin: this.padBegin,
      dates: this.dates,
      padEnd: this.padEnd
    };
  }
}
