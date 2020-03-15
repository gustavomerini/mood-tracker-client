import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import moment, { Moment } from "moment";
import { MqToolsService } from "mq-tools";

import { ItemService, ITodoItemJson } from "../../services/item.service";

interface ITodoItemsByMonth {
  month: { numerical: number; formatted: string };
  year: number;
  items: Array<ITodoItemJson>;
}

@Component({
  selector: "moods-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ItemListComponent implements OnInit {
  itemsByMonth: Array<ITodoItemsByMonth>;

  constructor(private _itemService: ItemService) {}

  ngOnInit(): void {
    this._fetchItems();
  }

  private async _fetchItems(): Promise<void> {
    const itemCollection = await this._itemService.collection();
    this.itemsByMonth = itemCollection.reduce(
      (acc: Array<ITodoItemsByMonth>, i) => {
        const date: Moment = moment(i.eventTime);
        const monthNum = date.month();
        const yearNum = date.year();
        const monthCollection = acc.find(el => {
          return el.month.numerical === monthNum && el.year === yearNum;
        });
        if (monthCollection == null) {
          const newMonthCollection: ITodoItemsByMonth = {
            month: { numerical: monthNum, formatted: date.format("MMMM") },
            year: yearNum,
            items: [i]
          };
          acc = [...acc, newMonthCollection];
        } else {
          monthCollection.items = [...monthCollection.items, i];
        }
        return acc;
      },
      []
    );
  }
}
