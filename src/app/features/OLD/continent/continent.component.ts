import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
//import {TableViewComponent} from '../tableview/table-view.component';
import {DataService} from '../../../core/data.service';
import {ActivatedRoute} from '@angular/router';
import {FilterComponent} from '../../../shared/filter/filter.component';
import {ChartviewComponent} from "../../../shared/chartview/chartview.component";

@Component({
  selector: 'app-continent',
    imports: [
        //TableViewComponent,
        FilterComponent,
        ChartviewComponent
    ],
  templateUrl: './continent.component.html',
  styleUrl: './continent.component.css'
})
export class ContinentComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  selectedContinent = signal<string>("");
  minPopulation: number | null = null

  constructor(public dataService: DataService) {}

  ngOnInit() {
    const subscription = this.activatedRoute.paramMap.subscribe(params => {
      const continentId = params.get('continentId');
      if (continentId) {
        this.selectedContinent.set(continentId);
      }
      // Cancel the subscription when the component is destroyed
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    });
  }

  onMinPopulation(minPopulation: number) {
    this.minPopulation = minPopulation;
  }
}
