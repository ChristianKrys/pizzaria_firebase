
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { PizzaService } from '../shared/pizza.service';
import { IPizza } from '../shared/interfaces/pizza';


@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent {

  pizzaForm! : FormGroup;
  public loading : boolean = false;
  public errorMessage : string = '';
  private imageData! : any;
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

  public commandePizzas: any[] = [];
  

  constructor(
    private formBuilder : FormBuilder,
    private route : ActivatedRoute,
    private pizzaService : PizzaService,
    private router : Router
  ){}

  // ngOnInit(): void {

  //   this.pizzaForm = this.formBuilder.group({
  //     id: null,
  //     pizzaName: null,
  //     pizzaPhoto: null,
  //     pizzaPrice: null,
  //     pizzaDescription: null
  //   });

  //   // this.route.paramMap.subscribe(params => {
  //   //   const pizzaId = String(params.get('id'));

  //   //   if(!!pizzaId){
  //   //     this.pizzaService.getpizzaById(pizzaId).subscribe(pizza => {
  //   //       this.pizzaForm.patchValue({
  //   //         id: pizza.id,
  //   //         pizzaName: pizza.pizzaName,
  //   //         pizzaPhoto: pizza.pizzaPhoto,
  //   //         pizzaPrice: pizza.pizzaPrice,
  //   //         pizzaDescription: pizza.description,
  //   //       });
  //   //     });
  //   //   }else{
  //   //     this.pizzaForm.reset();
  //   //   }
  //   // });

    
    
  //   const priceControl = this.pizzaForm.controls['pizzaPrice'];
  //   priceControl.valueChanges.pipe(
  //     debounceTime(3000)  // ------ temps d'attente entre les saisies avant la réaction du control ------ 
  //   ).subscribe(
  //     val => {
  //       if(priceControl.errors){
  //         const keys = Object.keys(priceControl.errors);
  //         keys.map(key => {
  //           this.pizzaPriceError = '';
  //           if(!priceControl.dirty || priceControl.value.length < 1) return
  //           this.pizzaPriceError = key === 'pizzaPriceError' ? this.priceMessage['pizzaPriceError'] : this.priceMessage['required'] ;
  //           console.log(`${key} : ${this.pizzaPriceError}  long: ${priceControl.value.length}`)
  //         });          
  //       }
  //     }
  //   );

  // }
  
  // addPizza = (pizza: IPizza) => this.commandePizzas.push(pizza);

  // removePizza = (pizza: IPizza) => {
  //   let index = this.commandePizzas.indexOf(pizza);
  //   if(index > -1) this.commandePizzas.splice(index,1);
  // }

  // onSubmit() {
  //   const pizza = { ...this.pizzaService.emptyPizza, ...this.pizzaForm.value };
  //   this.pizzaService.addPizza(pizza)
  //     .then(piz => console.log('Pizza enregistrée', piz))
  //     .catch(err => console.log('Echec enregistrement', err));
  // }

  // savepizza(){
  //   let pizza : IPizza = this.pizzaService.getDefaultpizza();
    
  //   pizza = {pizza,...this.pizzaForm.value};
        
  //   if(this.pizzaForm.valid){
  //     this.loading = true;
  //     if(pizza.id === 0 || !pizza.id){
  //       this.loading = true;
  //       this.pizzaService.generatepizzaId().subscribe(
  //         id => {
  //           pizza.id = id;
  //           pizza.pizzaPhoto = this.imageData; //'assets/img/indoors.jpg';
  //           this.pizzaService.createpizza(pizza)
  //           .subscribe({
  //             next : (pizza) => {
  //               this.saveComplited(true,`Enregistrement réussi. ${pizza}`);
  //             },        
  //             error : err => {
  //               this.saveComplited(false,`Echec d'enregistrement. ${err}`);
  //             }     
  //           }
  //           );
  //         }
  //       );
  //     }else{
  //       this.pizzaService.updatepizza(pizza)
  //       .subscribe({
  //         next : (pizza) => {
  //           this.saveComplited(true,`Mise à jour réussie. ${pizza}`);
  //         },        
  //         error : err => {
  //           this.saveComplited(false,`Echec de mise à jour. ${err}`);
  //         }      
  //       }
  //       );
  //     }

  //   }else{
  //     this.saveComplited(false,'Formulaire non valide');   
  //   }

  // }

  // supprimerpizza(){
  //   let pizza : IPizza = this.pizzaService.getDefaultpizza();
  //   pizza = {pizza,...this.pizzaForm.value};

  //   if(this.pizzaForm.valid){
  //     if(pizza.id > 0){        
  //       this.pizzaService.deletepizza(pizza.id)
  //       .subscribe({
  //         next : (pizza) => {
  //           this.saveComplited(true,`Suppression réussie. ${pizza}`);
  //         },        
  //         error : err => {
  //           this.saveComplited(false,`Echec de Suppression. ${err}`);
  //         }      
  //       }
  //       );
  //     }
  //   }else{
  //     this.saveComplited(false,'Formulaire non valide');    
  //   }

  // }

  // closeErrorMessage(){
  //   this.errorMessage = '';
  // }

  // saveComplited(complited : boolean, message : string){

  //   if(complited){
  //     this.pizzaService.getpizzas().subscribe(
  //       pizzas => {  
  //         this.pizzaForm.reset();
  //         this.router.navigate(['/pizzas']);      
  //       }
  //     );
  //   }else{
  //     this.errorMessage = message;
  //   }
  //   console.log(message);
  //   this.loading = false;

  // }


  // sendForm(){
  //   console.log(this.pizzaForm.value);
    
  // }

  // handleChange(event : any){   
    
  //   console.log(event);
    
  //   if(event.target.files.length <= 0 ) return

  //   const file = event.target.files[0]; 

  //   console.log(`handleChange name: ${file.name} type: ${file.type} size: ${file.size}`); 


  //   //---- Conversion du fichier image en binaire sur 64 bits ------
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => { 
  //     this.imageData = reader.result;
  //     //this.pizzaForm.value.pizzaPhoto = this.imageData;
  //     this.pizzaForm.patchValue({pizzaPhoto : this.imageData})
  //    };               
  // }

  // setDefaultImage() : string {

  //   console.log(this.pizzaForm.value.pizzaPhoto);
    
  //   return this.pizzaForm.value.pizzaPhoto ? this.pizzaForm.value.pizzaPhoto : 'assets/img/default.jpeg';
  // }



}

