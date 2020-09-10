import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  HostBinding
} from '@angular/core';
import { Router } from '@angular/router';
import {
  DatetimeSerialized,
  stringToDatetime,
  datetimeToString
} from 'datetime-picker';
import { Subject, Subscriber } from 'rxjs';

import { TodoItemModel } from '../../store/models';
import { ViewManagementService } from '../../services/view-management.service';
import { ItemService } from '../../services/item.service';

type Action = {
  action: 'show' | 'cancel' | 'ok';
  datetime?: DatetimeSerialized;
};

@Component({
  selector: 'moods-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private router: Router,
    private viewService: ViewManagementService,
    private itemService: ItemService
  ) {
    this.calendarAction.subscribe(this.actionSub);
  }

  @Input() item: TodoItemModel;

  @ViewChild('dtPicker') dtPickerTemplate: TemplateRef<any>;

  @HostBinding('class.rated')
  get isRated() {
    return this.item.mood != null;
  }

  eventDatetime: DatetimeSerialized;

  modal = this.viewService.modal;

  private calendarAction = new Subject<Action>();
  private actionSub = new Subscriber<Action>(a => {
    if (a.action === 'show') {
      this.eventDatetime = stringToDatetime(this.item.eventTime);
      this.modal.show(this.dtPickerTemplate);
      return;
    }
    if (a.action === 'ok') {
      const dts = datetimeToString(a.datetime);
      const updateData = { id: this.item.id, eventTime: dts };
      this.itemService.update(updateData);
      this.eventDatetime = a.datetime;
    }
    this.modal.hide();
  });

  toEdit() {
    this.router.navigate(['edit', this.item.id]);
  }

  onCalendarOk(dt: DatetimeSerialized) {
    this.calendarAction.next({ action: 'ok', datetime: dt });
  }

  onCalendarCancel() {
    this.calendarAction.next({ action: 'cancel' });
  }

  showCalendar() {
    this.calendarAction.next({ action: 'show' });
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.actionSub.unsubscribe();
  }

  ngAfterViewInit() { }
}
