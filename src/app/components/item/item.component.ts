import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

import { TodoItemModel } from "../../store";

@Component({
  selector: "moods-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ItemComponent implements OnInit {
  @Input() item: TodoItemModel;
  @Output() dateClick = new EventEmitter<undefined>();

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  toEdit() {
    this._router.navigate(["edit", this.item.id]);
  }

  onDateClick() {
    this.dateClick.emit();
  }
}
