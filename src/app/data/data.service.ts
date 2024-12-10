import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Population} from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiURL = "https://restcountries.com/v3.1/all?fields=name,continents,population";
  populationData = signal<Population[]>([])
  private destroyRef = inject(DestroyRef);

  constructor(private http: HttpClient) {
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
        console.log(extractedData);
        this.getPopulationByContinent()
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

  // List of continents in the data
  getContinents() {
    return [...new Set(this.populationData().map(country => country.continent))]
  }

  getPopulationByContinent() {
    const populationMap = new Map<string, number>();

    this.populationData().forEach(item => {
      const currentPopulation = populationMap.get(item.continent) || 0;
      populationMap.set(item.continent, currentPopulation + item.population);
    });

    return Array.from(populationMap, ([continent, totalPopulation]) => ({
      continent,
      totalPopulation
    }));
  }

  getPopulationByCountry(continent: string) {

  }


}
