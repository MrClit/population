import {Component, Input} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {DataTable} from '../../core/data.model';

@Component({
  selector: 'app-tableview',
  imports: [
    DecimalPipe
  ],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css'
})
export class TableViewComponent {
  @Input() data: DataTable[] = [];
}
