// import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataTable, JsonData, Population} from './data.model';
import {enviornment} from '../../enviornments/enviornment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiURL = enviornment.baseUrl;
  populationData = signal<Population[]>([]);
  populationByContinent = signal<DataTable[]>([]);
  loading = signal(true);

  // private destroyRef = inject(DestroyRef);

  constructor(private http: HttpClient) {
    // Data is refreshed once when the Service is constructed
    this.refreshData()
  }

  refreshData(): void {
    const subscription = this.http.get<JsonData[]>(this.apiURL).subscribe({
      next: data => {
        const extractedData: Population[] = data.map(country => ({
          country: country.name.common,
          continent: country.continents[0],
          population: country.population,
        }));
        this.populationData.set(extractedData);
        this.populationByContinent.set(this.calcPopulationByContinent());
        this.loading.set(false);
      },
      error: err => {
        console.log('Error extracting data: ', err);
      },
      complete: () => {
        subscription.unsubscribe();
      }
    })
  }

  // List of continents in the data to show in the Menu
  getContinents() {
    return [...new Set(this.populationData().map(country => country.continent))]
  }

  calcPopulationByContinent() {
    const populationMap = new Map<string, number>();

    // Agregar la población por continentes en el Map
    this.populationData().forEach(item => {
      const currentPopulation = populationMap.get(item.continent) || 0;
      populationMap.set(item.continent, currentPopulation + item.population);
    });

    // Convertir el Map a un array de objetos tipo DataTable
    const populationArray = Array.from(populationMap, ([continent, totalPopulation]) => ({
      name: continent,
      population: totalPopulation
    }) as DataTable);

    // Ordenar por población en orden descendente
    return populationArray.sort((a, b) => b.population - a.population);
  }

  getPopulationByContinent(minPopulation: number | null) {
    // Filtrar por población mínima si se especifica
    const filteredArray = minPopulation
      ? this.populationByContinent().filter(item => item.population >= minPopulation)
      : this.populationByContinent();

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
