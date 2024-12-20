import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataTable, Population} from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiURL = "https://restcountries.com/v3.1/all?fields=name,continents,population";
  populationData = signal<Population[]>([])
  private destroyRef = inject(DestroyRef);

  constructor(private http: HttpClient) {
    // Data is refreshed once when the Service is constructed
    this.refreshData()
  }

  refreshData(): void {
    const subscription = this.http.get<any[]>(this.apiURL).subscribe({
      next: data => {
        const extractedData: Population[] = data.map(country => ({
          country: country.name.common,
          continent: country.continents[0],
          population: country.population,
        }));
        this.populationData.set(extractedData);
        this.getPopulationByContinent(null)
      },
      error: err => {
        console.log('Error extracting data: ', err);
      }
    })
    // Cancel the subscription when the component is destroyed
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  // List of continents in the data to show in the Menu
  getContinents() {
    return [...new Set(this.populationData().map(country => country.continent))]
  }

  getPopulationByContinent(minPopulation: number | null) {
    const populationMap = new Map<string, number>();

    this.populationData().forEach(item => {
      const currentPopulation = populationMap.get(item.continent) || 0;
      populationMap.set(item.continent, currentPopulation + item.population);
    });

    // Convertir el Map a un array de objetos tipo DataTable
    const populationArray = Array.from(populationMap, ([continent, totalPopulation]) => ({
      name: continent,
      population: totalPopulation
    }) as DataTable);

    // Filtrar por población mínima si se especifica
    const filteredArray = minPopulation
      ? populationArray.filter(item => item.population >= minPopulation)
      : populationArray;

    // Ordenar por población en orden descendente
    return filteredArray.sort((a, b) => b.population - a.population);
  }

  getPopulationByCountry(continent: string, minPopulation: number | null) {
    const populationArray = this.populationData()
      .filter(item => item.continent === continent)
      .map((item) => {
        return {name: item.country, population: item.population} as DataTable;
      })

    // Filtrar por población mínima si se especifica
    const filteredArray = minPopulation
      ? populationArray.filter(item => item.population >= minPopulation)
      : populationArray;

    // Ordenar por población en orden descendente
    return filteredArray.sort((a, b) => b.population - a.population);
  }
}
