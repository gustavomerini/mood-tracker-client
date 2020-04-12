import moment from "moment";
import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { isEqual } from "lodash";
import { map, take, skipWhile, tap } from "rxjs/operators";

import { TodoItemModel } from "../../store";
import { ItemService } from "../../services/item.service";
import { ViewManagementService } from "../../services/view-management.service";

@Component({
  selector: "moods-item-edit",
  templateUrl: "./item-edit.component.html",
  styleUrls: ["./item-edit.component.scss"],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ItemEditComponent implements OnDestroy {
  item$: Observable<TodoItemModel>;
  formattedDate$: Observable<string>;

  form = this.formBuilder.group({
    title: ["", Validators.required],
    description: [""]
  });

  private _submitDisabled$: BehaviorSubject<boolean> = new BehaviorSubject(
    true
  );
  private submitDisabledSubscription: Subscription;
  submitDisabled$: Observable<boolean> = this._submitDisabled$.asObservable();

  private id: number;
  private initialData: Partial<TodoItemModel> = {};

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private formBuilder: FormBuilder,
  ) {
    this.route.params
      .pipe(
        take(1),
        map(p => parseInt(p.id)),
        tap(id => (this.id = id))
      )
      .subscribe(id => this.itemService.setFilter({ ids: [id] }));

    this.item$ = this.itemService.filteredEntities$.pipe(
      skipWhile(e => e.length === 0),
      take(1),
      map(entries => entries[0])
    );
    this.item$.pipe(take(1)).subscribe(i => {
      this.initialData = { title: i.title, description: i.description };
      this.form.patchValue(i);
    });

    this.formattedDate$ = this.item$.pipe(
      map(i => this.formatDate(i.eventTime))
    );

    this.submitDisabledSubscription = this.form.valueChanges.subscribe(v => {
      this._submitDisabled$.next(
        this.form.invalid || isEqual(v, this.initialData)
      );
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const data: Partial<TodoItemModel> = {
        ...this.form.value,
        id: this.id
      };
      this.itemService
        .update(data)
        .pipe(take(1))
        .subscribe(_ => this._submitDisabled$.next(true));
    }
  }

  ngOnDestroy(): void {
    this.submitDisabledSubscription.unsubscribe();
  }

  private formatDate(isoDate: string) {
    const datetime = moment(isoDate);
    return datetime.format("Do MMMM YYYY");
  }
}
