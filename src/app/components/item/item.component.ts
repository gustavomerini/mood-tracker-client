import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

import { ITodoItemJson } from "../../services/item.service";

@Component({
  selector: "moods-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ItemComponent implements OnInit {
  @Input() item: ITodoItemJson;

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  toEdit() {
    this._router.navigate(["edit", this.item.id]);
  }
}
