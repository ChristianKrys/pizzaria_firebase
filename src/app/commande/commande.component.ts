import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { PizzaService } from '../shared/pizza.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {

  pizzaForm! : FormGroup;
  public loading : boolean = false;
  public errorMessage : string = '';
  public pizzaPriceError! : string;


  private priceMessage = {
    required : 'Vous devez entrer le prix de la pizza',
    pizzaPriceError : 'Prix non valide'
  }

  public pizzas = [
    "Marguerita",
    "Regina",
    "Napolonia",
    "Quatre fromages",
    "Jambon",
    "Toma",
    "Mangue",
    "Kaolin fouété",
    "Paté"
  ]

  public commandePizzas: string[] = [];
  

  constructor(
    private formBuilder : FormBuilder,
    private route : ActivatedRoute,
    private pizzaService : PizzaService,
    private router : Router
  ){}

  ngOnInit(): void {

    this.pizzaForm = this.formBuilder.group({
      id: null,
      nomClient: null,
      numeroCommande: null,
      refArticle: null,
      livree: null
    });

  }
  
  addPizza = (pizza: string) => {
    this.commandePizzas.push(pizza);
    console.log(this.commandePizzas);
    
  }

  removePizza = (pizza: string) => {
    let index = this.commandePizzas.indexOf(pizza);
    if(index > -1) this.commandePizzas.splice(index,1);
    console.log(this.commandePizzas);
  }

  onSubmit() {
    this.pizzaForm.value.commandePizzas = this.commandePizzas;
    let data = this.pizzaForm.value;
    console.log(data);
    
    this.pizzaService.createPizza(data)
    .then(piz => console.log('Commande enregistrée', piz))
    .catch(err => console.log('Echec enregistrement Commande', err));

  }






}

