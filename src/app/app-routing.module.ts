import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListWordsSrComponent } from './components/list-words-sr/list-words-sr.component';
import { SearchSrComponent } from './components/search-sr/search-sr.component';
import { SimpleGuiComponent } from './components/simple-gui/simple-gui.component';
import { SimpleSrComponent } from './components/simple-sr/simple-sr.component';

const routes: Routes = [
  { path: '', component: ListWordsSrComponent},
  { path: 'simple-sr', component: SimpleSrComponent},
  { path: 'search-sr', component: SearchSrComponent},
  { path: 'simple-gui', component: SimpleGuiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
