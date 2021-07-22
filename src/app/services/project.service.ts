import { Injectable } from '@angular/core';
import { FakeDbFacadeService, Resource } from './fake-db-facade.service';

export interface Project {
  name: string,
  resources: Resource[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects: Project[];

  constructor(private dbFacade: FakeDbFacadeService) {

    const projectResourceIndexes =  [
      [1, 11, 5, 3],
      [3, 2, 12, 7],
      [0, 4, 13, 10]
    ]

    const projects: Project[] = projectResourceIndexes.map((indexes, index) => {
      const resources = this.dbFacade.getResourcesByIndexes(indexes);
      return { name:  `Prosjekt ${index + 1}`, resources } as Project;
    })

    this.projects = projects;
  }

  getProjects(): Project[] {
    return this.projects;
  }

  addResourceToProject(projectName: string, resource: Resource): void {
    this.projects = this.projects.map((project) => {
      if (project.name = projectName) {
        project.resources.push(resource);
      }

      return project;
    });
  }
}
