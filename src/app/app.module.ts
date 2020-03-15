import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MqToolsModule } from "mq-tools";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemListComponent } from "./components/item-list/item-list.component";
import { ItemComponent } from "./components/item/item.component";
import { ListItemDateComponent } from "./components/list-item-date/list-item-date.component";
import { ItemEditComponent } from './components/item-edit/item-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemComponent,
    ListItemDateComponent,
    ItemEditComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MqToolsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
