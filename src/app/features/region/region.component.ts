import {Component, computed, DestroyRef, inject, OnInit, Signal, signal} from '@angular/core';
import {DataService} from '../../core/data.service';
import {ActivatedRoute} from '@angular/router';
import {FilterComponent} from '../../shared/filter/filter.component';
import {ChartviewComponent} from "../../shared/chartview/chartview.component";
import {DataTable} from '../../core/data.model';

@Component({
  selector: 'app-continent',
    imports: [
        FilterComponent,
        ChartviewComponent
    ],
  templateUrl: './region.component.html',
  styleUrl: './region.component.css'
})
export class RegionComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  selectedContinent = signal<string>("");
  minPopulation: number | null = null

  populationByRegion: Signal<DataTable[]> = signal<DataTable[]>([]);
  title = "";

  constructor(public dataService: DataService) {}

  ngOnInit() {

    // Recuperamos la ruta
    const subscription = this.activatedRoute.paramMap.subscribe(params => {
      const continentId = params.get('continentId');
      if (continentId) {
        this.selectedContinent.set(continentId);
        // TODO: comprobar si la ruta es valida
      }
      // Cancel the subscription when the component is destroyed
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    });

    // Obtenemos los datos de Service con el valor de la ruta seleccionada
    this.populationByRegion = computed(()=> {
      if (this.dataService.loading()) {
        return [] as DataTable[];
      } else {
        if (this.selectedContinent() === "global") {
          // Si la ruta es "/region/global"
          this.title = "Global Population by Continent";
          return this.dataService.getPopulationByContinent(this.minPopulation);
        } else {
          //Si la ruta contiene un ID de continente
          this.title = this.selectedContinent() + " Population by Country"
          return this.dataService.getPopulationByCountry(this.selectedContinent(), this.minPopulation);
        }
      }
    });
  }

  onMinPopulation(minPopulation: number) {
    this.minPopulation = minPopulation;
  }
}
