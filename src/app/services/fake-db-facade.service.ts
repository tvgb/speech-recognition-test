import { Injectable } from '@angular/core';

export interface Resource {
	name: string,
	price: number
}

@Injectable({
  providedIn: 'root'
})
export class FakeDbFacadeService {

  data: Resource[] = [];

	constructor() {
		const data: Resource[] = [
			{ name: 'Fotlist', price: 200 },
			{ name: 'Betong b30', price: 120 },
			{ name: 'Karmlist', price: 250 },
			{ name: 'Sponplate vegg', price: 100 },
			{ name: 'Taklist', price: 200 },
			{ name: 'Limtredrager', price: 600 },
			{ name: 'Betong b20', price: 100 },
			{ name: 'Maling rød', price: 250 },
			{ name: 'Maling grønn', price: 250 },
			{ name: 'Maling blå', price: 250 },
			{ name: 'Rektangulær kledning 120x24', price: 35 },
			{ name: 'D-fals kledning 120x24', price: 45 },
			{ name: 'Terrassebord imp 28x120', price: 23 },
			{ name: 'Terrassebord royal 28x120', price: 44 }
		]

		this.data = data;
	}

  getResources(query: string): Resource[] {

    if (query.toLowerCase() === 'alt') {
      return this.data;
    }

    const resources: Resource[] = this.data.filter((resource) => {
      const nameParts = resource.name.toLowerCase().split(' ');
      const queryParts = query.toLowerCase().split(' ');

      for (const queryPart of queryParts) {
        if (nameParts.includes(queryPart)) {
          return resource;
        }
      }

      for (let i = 1; i <= queryParts.length; i++) {
        if (nameParts.includes(queryParts[i - 1] + queryParts[i])) {
          return resource;
        }
      }

      return null;
    })

    return resources;
  }

  getResourceByIndex(index: number): Resource | null {
    if (index < this.data.length) {
      return this.data[index];
    }

    return null
  }

  getResourcesByIndexes(indexes: number[]): Resource[] {
    const resources: Resource[] = indexes.map((index) => {
      return this.data[index];
    })

    return resources;
  }
}
