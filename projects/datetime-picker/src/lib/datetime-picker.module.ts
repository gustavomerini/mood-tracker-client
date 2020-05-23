import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {
  DatetimePickerComponent,
  CalendarDayComponent,
  TimePickerComponent
} from './components';
import { calendarReducer } from './store';

@NgModule({
  declarations: [
    DatetimePickerComponent,
    CalendarDayComponent,
    TimePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature(calendarReducer.key, calendarReducer.reducer)
  ],
  exports: [DatetimePickerComponent]
})
export class DatetimePickerModule {}
