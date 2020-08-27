import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_BOOTSTRAP_LISTENER, ComponentRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  EntityDataModule,
  DefaultDataServiceConfig,
  Pluralizer
} from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MqToolsModule } from 'mq-tools';
import { DatetimePickerModule } from 'datetime-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ItemComponent,
  ItemEditComponent,
  ItemListComponent,
  ListItemDateComponent,
  ModalComponent
} from './components';
import { ModalContentDirective } from './directives';
import { defaultDataServiceConfig, ViewManagementService } from './services';
import { environment } from '../environments/environment';
import {
  entityConfig,
  TodoPluralizer,
  ItemsByMonthEffects,
  appReducers
} from './store';
import { DtTestComponent } from './components/dt-test/dt-test.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemComponent,
    ListItemDateComponent,
    ItemEditComponent,
    ModalContentDirective,
    ModalComponent,
    DtTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MqToolsModule,
    DatetimePickerModule,
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
    { provide: Pluralizer, useClass: TodoPluralizer },
    {
      provide: APP_BOOTSTRAP_LISTENER,
      deps: [ViewManagementService],
      useFactory: (viewService: ViewManagementService) => {
        return (compRef: ComponentRef<any>) => {
          if (compRef.componentType === ModalComponent) {
            viewService.registerModalRef(compRef);
          }
        };
      },
      multi: true
    }
  ],
  bootstrap: [AppComponent, ModalComponent]
})
export class AppModule { }
