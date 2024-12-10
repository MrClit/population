import { Component } from '@angular/core';
import {TableViewComponent} from '../tableview/table-view.component';
import {DataService} from '../data/data.service';

@Component({
  selector: 'app-global',
  imports: [
    TableViewComponent
  ],
  templateUrl: './global.component.html',
  styleUrl: './global.component.css'
})
export class GlobalComponent {

  constructor(public dataService: DataService) {}
}

// TODO: pasarle a table-view la tabla de continentes del servicio
