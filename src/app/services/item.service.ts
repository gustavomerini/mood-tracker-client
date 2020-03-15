import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface ITodoItemJson {
  id: number;
  createdAt: string;
  eventTime: string;
  title: string;
  description?: string;
  mood?: number;
  hasFinished: boolean;
}

@Injectable({
  providedIn: "root"
})
export class ItemService {
  private _apiUrl = "http://localhost:3000";
  constructor(private _http: HttpClient) {}

  collection(): Promise<Array<ITodoItemJson>> {
    return this._http
      .get<Array<ITodoItemJson>>(`${this._apiUrl}/todo-item`)
      .toPromise();
  }
}
