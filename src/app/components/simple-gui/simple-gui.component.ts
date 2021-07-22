import { Component, OnInit } from '@angular/core';
import { FakeDbFacadeService, Resource } from 'src/app/services/fake-db-facade.service';
import { Project, ProjectService } from 'src/app/services/project.service';
import { SrService } from 'src/app/services/sr.service';

@Component({
  selector: 'app-simple-gui',
  templateUrl: './simple-gui.component.html',
  styleUrls: ['./simple-gui.component.scss']
})
export class SimpleGuiComponent implements OnInit {

  projects: Project[] = [];
  resources: Resource[] = [];
  selectedProjectIndex = -1;
  isSearching = false;
  feedBackString = '';


  keywords: string[];

  constructor(private projectService: ProjectService, private dbFacade: FakeDbFacadeService, private sr: SrService) {
    this.keywords = [
      'velg',
      'legg til'
    ];
  }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }

  selectProject(index: number) {
    this.selectedProjectIndex = index;
    this.resources = this.projects[index].resources;
  }

  listenForQuery(): void {
    this.isSearching = true;

    this.sr.listenForSingleWord().then((res) => {
      this.isSearching = false;
      this.chooseAction(res);
    })
  }

  chooseAction(query: string): void {
    this.feedBackString = '';
    const queryParts = query.toLowerCase().split(' ');

    if (queryParts.includes('velg')) {

      const searchableString = queryParts.filter(part => part !== 'velg').join(' ');
      let selectedIndex = -1;
      this.projects.forEach((project, index) => {
        if (project.name.toLowerCase() === searchableString) {
          selectedIndex = index;
        }
      })

      if (selectedIndex !== -1) {
        this.selectProject(selectedIndex);
      } else {
        this.feedBackString = `Fant ikke project med navnet "${searchableString}".`;
      }


    } else if (queryParts.includes('legg') && queryParts.includes('til') && queryParts.includes('ressurs')) {
      if (this.selectedProjectIndex === -1) {
        this.feedBackString = 'Et prosjekt må være valgt for å kunne legge til en ressurs.';
        return;
      }

      const searchableString = queryParts.filter(part => (part !== 'legg' && part !== 'til' && part !== 'ressurs')).join(' ');

      // TODO: Få fram alle resulteter fra søket og la brukeren velge et med en trykk.

    } else {
      this.feedBackString = `Kommando "${query}" ble ikke gjenkjent.`;
    }
  }




}
