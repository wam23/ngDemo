import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokerTableComponent } from './poker-table/poker-table.component';
import { PokerLobbyComponent } from './poker-lobby/poker-lobby.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PokerResultComponent } from './poker-result/poker-result.component';

@NgModule({
  declarations: [
    AppComponent,
    PokerTableComponent,
    PokerLobbyComponent,
    PokerResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
