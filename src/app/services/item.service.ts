import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
  DefaultDataServiceConfig
} from "@ngrx/data";

import { TodoItemModel } from "../store/models";

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: "http://localhost:3000",
  timeout: 3000
};

@Injectable({
  providedIn: "root"
})
export class ItemService extends EntityCollectionServiceBase<TodoItemModel> {
  constructor(
    private _http: HttpClient,
    elementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super("todo-item", elementsFactory);
  }
}
