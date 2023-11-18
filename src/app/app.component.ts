import { Component } from '@angular/core';
import jsonData from './demo.json';

interface Stanica {
  stanicaId: number;
  nazivStanice: string;
}

interface StanicaCena {
  stanica1RefId: number;
  stanica2RefId: number;
  cena: number;
}

interface Relacija {
  nazivRelacije: string;
  stanice: Stanica[];
  staniceCena: StanicaCena[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  relacija: Relacija = jsonData;
}
