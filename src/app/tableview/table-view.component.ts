import {Component, Input} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {DataTable} from '../data/data.model';

@Component({
  selector: 'app-tableview',
  imports: [
    DecimalPipe
  ],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css'
})
export class TableViewComponent {
  //@Input() data: { name: string; population: number }[] = [];

  data: DataTable[] = [
    { name: 'Africa', population: 1340598147 },
    { name: 'Asia', population: 4641054775 },
    { name: 'Europe', population: 747636026 },
    { name: 'North America', population: 592072212 },
    { name: 'Oceania', population: 43111704 },
    { name: 'South America', population: 430759766 }
  ];

}
