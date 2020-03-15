import { ViewEncapsulation } from "@angular/core";
import { Component } from "@angular/core";
import { MqToolsService } from "mq-tools";

@Component({
  selector: "moods-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private mqService: MqToolsService) {
    mqService.current$.subscribe(width => console.log(width));
  }
}
