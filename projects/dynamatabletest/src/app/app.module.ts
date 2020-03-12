import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DynamatableModule } from 'projects/dynamatable/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynamatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
