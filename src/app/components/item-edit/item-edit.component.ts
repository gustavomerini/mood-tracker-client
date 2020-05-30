import moment from 'moment';
import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { isEqual } from 'lodash';
import { map, take, tap } from 'rxjs/operators';

import { TodoItemModel } from '../../store';
import { ItemService } from '../../services/item.service';
import { ViewManagementService } from 'src/app/services';
import { DatetimeSerialized, datetimeToString } from 'datetime-picker';

@Component({
  selector: 'moods-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ItemEditComponent implements OnDestroy {
  item$: Observable<TodoItemModel>;
  isNew$: Observable<boolean>;
  formattedDate?: string;

  modalViewId = 500;
  modal = this.viewService.modal;

  form: FormGroup;

  private _submitDisabled$: BehaviorSubject<boolean> = new BehaviorSubject(
    true
  );
  private submitDisabledSubscription: Subscription;
  submitDisabled$: Observable<boolean> = this._submitDisabled$.asObservable();

  private id: number;
  private initialData: Partial<TodoItemModel> = { };

  private itemSubscription: Subscription;
  private isoEventDateTime: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private viewService: ViewManagementService
  ) {
    const fieldsGroup = {
      eventTime: [this.formatDate(), Validators.required],
      title: ['', Validators.required],
      description: ['']
    };

    this.form = this.formBuilder.group(fieldsGroup);

    this.route.params
      .pipe(
        take(1),
        map((p) => (p.id ? parseInt(p.id, 10) : -1)),
        tap((id) => (this.id = id))
      )
      .subscribe(id => {
        this.itemService.setFilter({ ids: [id]});
      });

    this.item$ = this.itemService.filteredEntities$.pipe(
      map(entries => (entries.length > 0 ? entries[0] : undefined))
    );

    this.isNew$ = this.item$.pipe(
      map(i => {
        return i == null;
      }),
      tap(isNew => {
        if (!isNew) {
          this.form.removeControl('eventTime');
        }
      })
    );

    this.itemSubscription = this.item$.subscribe(i => {
      if (i != null) {
        this.formattedDate = this.formatDate(i.eventTime);
        this.initialData = {
          title: i.title,
          description: i.description
        };
        this.form.patchValue(i);
      }
    });

    this.submitDisabledSubscription = this.form.valueChanges.subscribe(v => {
      this._submitDisabled$.next(
        this.form.invalid || isEqual(v, this.initialData)
      );
    });
  }

  openPicker() {
    this.modal.show(this.modalViewId);
  }

  onCalendarOk(val: DatetimeSerialized) {
    this.isoEventDateTime = datetimeToString(val);
    this.formattedDate = this.formatDate(this.isoEventDateTime);
    this.form.patchValue({
      eventTime: this.formattedDate
    });
    this.modal.hide();
  }

  onCalendarCancel() {
    this.modal.hide();
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.id !== -1) {
        const data: Partial<TodoItemModel> = {
          ...this.form.value,
          id: this.id,
        };
        this.itemService
          .update(data)
          .pipe(take(1))
          .subscribe(_ => this._submitDisabled$.next(true));
      } else {
        const data: TodoItemModel = {
          ...this.form.value,
          eventTime: this.isoEventDateTime,
        };
        this.itemService
          .add(data).subscribe(val => {
            this.router.navigate(['edit', val.id]);
          });
      }
    }
  }

  ngOnDestroy(): void {
    this.submitDisabledSubscription.unsubscribe();
    this.itemSubscription.unsubscribe();
  }

  private formatDate(isoDate?: string) {
    const datetime = moment(isoDate);
    return datetime.format('Do MMMM YYYY - hh:mm');
  }
}
