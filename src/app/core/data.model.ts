export interface Population {
  country: string;
  continent: string;
  population: number;
}

export interface DataTable {
  name: string;
  population: number;
}

export interface JsonData {
  name: {
    common: string;
  }
  continents: string[];
  population: number;
}
