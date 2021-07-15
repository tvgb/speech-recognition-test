import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleSrComponent } from './components/simple-sr/simple-sr.component';
import { SearchSrComponent } from './components/search-sr/search-sr.component';
import { ListWordsSrComponent } from './components/list-words-sr/list-words-sr.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleSrComponent,
    SearchSrComponent,
    ListWordsSrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
