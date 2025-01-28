import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Output() minPopulation = new EventEmitter<number>();

  form = new FormGroup({
    minPopulation: new FormControl(null, [Validators.required]),
  })

  onSubmit() {
    const numericValue = Number(this.form.value.minPopulation);
    this.minPopulation.emit(numericValue);
  }

}
