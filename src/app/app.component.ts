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
  selectedPolazak: any;
  selectedOdrediste: any;
  searchedPrice: any;
  rotateArrow: string='▽';
  
  title(title: any) {
    throw new Error('Method not implemented.');
  }
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

  showFunction() {
    let x: any = document.getElementById("myDIV");
    if (x.style.visibility === "hidden") {
      x.style.visibility='visible';
      x.style.marginBottom='0px';
      x.style.marginTop='20px';
      this.rotateArrow='△';
    } else {
      x.style.visibility='hidden';
      x.style.marginBottom='-150px';
      this.rotateArrow='▽';
    }
  }

  showPrice(){
    console.log('Polazak: ', this.selectedPolazak,'Odredište: ', this.selectedOdrediste);

    let polazak= parseInt(this.selectedPolazak,10);
    let odrediste= parseInt(this.selectedOdrediste,10);
    console.log('Polazak: ', polazak,'Odredište: ', odrediste);

    for(let k=0;k<this.relacija.staniceCena.length;k++){
      if(this.relacija.staniceCena[k].stanica1RefId===polazak && this.relacija.staniceCena[k].stanica2RefId===odrediste || this.relacija.staniceCena[k].stanica2RefId===polazak && this.relacija.staniceCena[k].stanica1RefId===odrediste){
        let cena = this.relacija.staniceCena[k].cena;
        this.searchedPrice="Cena: "+cena+" RSD";
      }
    }
  }
  
  public newState: Array<{ brojStanice: number; nazivStanice: string }> = [];

onPolazakChange(prom: any) {
  this.searchedPrice='';
  this.newState.splice(0, this.newState.length);
  let brojac = 0;
  let polazak = parseInt(this.selectedPolazak, 10);

  for (let i = 0; i < this.relacija.stanice.length; i++) {
    this.newState.push({
      brojStanice: this.relacija.stanice[i].stanicaId,
      nazivStanice: this.relacija.stanice[i].nazivStanice,
    });
  }
  while (this.relacija.stanice[brojac].stanicaId !== polazak){
    brojac++;
  }
  for (let j = 0; j <= brojac; j++) {
    this.newState.splice(0, 1);
  }
}

  
  
}
