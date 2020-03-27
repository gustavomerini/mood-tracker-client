import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import {
  EntityDataModule,
  DefaultDataServiceConfig,
  Pluralizer
} from "@ngrx/data";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MqToolsModule } from "mq-tools";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  ItemComponent,
  ItemEditComponent,
  ItemListComponent,
  ListItemDateComponent
} from "./components";
import { defaultDataServiceConfig } from "./services/item.service";
import { environment } from "../environments/environment";
import {
  entityConfig,
  TodoPluralizer,
  ItemsByMonthEffects,
  appReducers
} from "./store";

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemComponent,
    ListItemDateComponent,
    ItemEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MqToolsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ItemsByMonthEffects]),
    EntityDataModule.forRoot(entityConfig),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    { provide: Pluralizer, useClass: TodoPluralizer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
