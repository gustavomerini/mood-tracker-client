import { ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';
// import { MqToolsService } from "mq-tools";
import { ItemService } from './services/item.service';

@Component({
  selector: 'moods-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  constructor(
    // private mqService: MqToolsService,
    private itemService: ItemService
  ) {
    // this.mqService.current$.subscribe(width => console.log(width));
    this.itemService.getAll();
  }
}
