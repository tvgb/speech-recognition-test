import { Component, OnInit } from '@angular/core';
import { FakeDbFacadeService, Resource } from 'src/app/services/fake-db-facade.service';
import { SrService } from 'src/app/services/sr.service';

@Component({
  selector: 'app-search-sr',
  templateUrl: './search-sr.component.html',
  styleUrls: ['./search-sr.component.scss']
})
export class SearchSrComponent {

  query = '';
  resources: Resource[] = [];
  isSearching = false;

  constructor(private sr: SrService, private facade: FakeDbFacadeService) {}

  listenForQuery() {
    this.query = '';
    this.resources = [];
    this.isSearching = true;

    this.sr.listenForSingleWord().then((res) => {
      this.isSearching = false;
      this.query = res;

      this.resources = this.facade.getResources(this.query);
    });
  }

}
