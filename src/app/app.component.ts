import { Component } from '@angular/core';
import jsonData from './demo.json';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  relacija: Relacija = jsonData;

  priceForm: FormGroup;
  constructor(private formBuilder: FormBuilder){
    this.priceForm=this.formBuilder.group({
      percent: [0],
      decimal: ['zero']
    });
  }

  changePrice(i: any, j: any, novaCena: number) {
    for (let irow = 0; irow < this.relacija.staniceCena.length; irow++) {
      if (this.relacija.staniceCena[irow].stanica1RefId === this.relacija.stanice[i].stanicaId && this.relacija.staniceCena[irow].stanica2RefId === this.relacija.stanice[j].stanicaId) {
        console.log('Cena: ',this.relacija.staniceCena[irow].cena);
        this.relacija.staniceCena[irow].cena = novaCena;
      }
    }
  } 

  changePrices(){ 
    let cena=this.relacija.staniceCena;
    for(let i=0;i<cena.length;i++){
      cena[i].cena= cena[i].cena+cena[i].cena*this.priceForm.value.percent/100;
      Math.round(cena[i].cena);

      if(this.priceForm.value.decimal==='zero'){
        if(cena[i].cena%10!==0)
        cena[i].cena=cena[i].cena+(10-cena[i].cena%10);
      }else{
        if(cena[i].cena%10>0 && cena[i].cena%10<=5){
          cena[i].cena=cena[i].cena+(5-cena[i].cena%10);
        }else if(cena[i].cena%10>5 && cena[i].cena%10<=9 ){
          cena[i].cena=cena[i].cena+(10-cena[i].cena%10);
        }else{
          cena[i].cena=cena[i].cena;
        }
      }
    }
  }



}
