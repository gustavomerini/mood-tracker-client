import { ViewEncapsulation, ViewContainerRef, ViewChild } from "@angular/core";
import { Component } from "@angular/core";
import { MqToolsService } from "mq-tools";
import { ItemService } from "./services/item.service";
import { ApplicationService } from "./services/application.service";

@Component({
  selector: "moods-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  @ViewChild("modal", { read: ViewContainerRef })
  modalContainer: ViewContainerRef;

  constructor(
    //private mqService: MqToolsService,
    private appService: ApplicationService,
    private itemService: ItemService
  ) {
    //this.mqService.current$.subscribe(width => console.log(width));
    this.itemService.getAll();
  }

  ngAfterViewInit() {
    this.appService.registerModalContainer(this.modalContainer);
  }
  ngOnInit() {}
}
