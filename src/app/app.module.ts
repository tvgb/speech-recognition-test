import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleSrComponent } from './components/simple-sr/simple-sr.component';
import { SearchSrComponent } from './components/search-sr/search-sr.component';
import { ListWordsSrComponent } from './components/list-words-sr/list-words-sr.component';
import { SimpleGuiComponent } from './components/simple-gui/simple-gui.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleSrComponent,
    SearchSrComponent,
    ListWordsSrComponent,
    SimpleGuiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
