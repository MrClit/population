import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartConfiguration, Chart, registerables} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {DataTable} from '../../core/data.model';

// Registra los componentes necesarios de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-chartview',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './chartview.component.html',
  styleUrl: './chartview.component.css'
})

export class ChartviewComponent implements OnChanges {
  @Input() data: DataTable[] = [];


  // Configuración inicial del gráfico
  public barChartType = 'bar' as const; // Tipo específico 'bar'
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [], // Categorías (nombres de países/regiones)
    datasets: [
      {
        label: 'Population',
        data: [], // Valores de población
        backgroundColor: '#1abc9c',
        borderColor: '#1abc9c',
        borderWidth: 1
      }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    indexAxis: 'y', // Configuración para barras horizontales
    scales: {
      x: {
        beginAtZero: true // Asegura que las barras comiencen desde cero
      }
    },
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      tooltip: {
        enabled: true
      }
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      const previousData = changes['data'].previousValue || [];
      const currentData = changes['data'].currentValue || [];

      // Comparamos que realmente data ha cambiado (aunque sea de orden)
      if (JSON.stringify(previousData) !== JSON.stringify(currentData)) {
        this.updateChart();
      }
    }
  }

  updateChart(): void {
    this.barChartData.labels = this.data.map(item => item.name); // Actualiza las etiquetas
    this.barChartData.datasets[0].data = this.data.map(item => item.population); // Actualiza los datos

    // Notifica a Chart.js que los datos han cambiado
    const chart = Chart.getChart('chartCanvas'); // Obtiene el gráfico por ID
    if (chart) {
      chart.update();
    }
  }

}
