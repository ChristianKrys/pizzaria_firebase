import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../shared/pizza.service';
import { Observable } from 'rxjs';
import { ICommande } from '../shared/interfaces/commande';
import { AngularFireStorage, AngularFireStorageReference } from "@angular/fire/compat/storage";


@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent implements OnInit {


  public strongCommandePizzas: any[] = [];
  public commandePizzas: any[] = [];
  public commandesPizzaWithIds$! : Observable<ICommande[]>;
  public imageUrl! : any;
  public imageFolder = 'images';

  private angularFireStorageReference!: AngularFireStorageReference;

  constructor(
              private pizzaService : PizzaService,
              private angularFireStorage: AngularFireStorage
              ){}

  ngOnInit(): void {
    // this.pizzaService.getCommandesPizza().subscribe(
    //   data => {
    //     this.strongCommandePizzas = data;        
    //   }
    // )

    this.commandesPizzaWithIds$ = this.pizzaService.getCommandesPizzaWithIds();
    // this.commandesPizzaWithIds$ = this.pizzaService.getCommandeFromServer();

    const id = 'CW1ej9aLse8IwU6x26gT';
    // this.pizzaService.getCommandeById(id).subscribe(
    //   val => {
    //     let docId = val.id;
    //     let data = val.data();
    //     const doc = { docId, data }
    //     // console.log(doc);
    //   }
    // );

    this.pizzaService.getSingleCommandeById(id).subscribe(
      val => {
        console.log(val);
      }
    );

    


  }


  transformData = this.pizzaService.transformData;


  getCommandesPizza(){
    this.pizzaService.getCommandesPizza().subscribe(
      data => {this.commandePizzas = data;}
    )
  };

  deletePizza = (data: any) => this.pizzaService.deletePizza(data);

  markDelivred = (data: any) => this.pizzaService.updatePizza(data);


  async onFileChange(event: any){
    //------ uploading file ------------
    const file = event.target.files[0];

    console.log(`handleChange name: ${file.name} type: ${file.type} size: ${file.size}`);

    const newFileName = 'mon image';

    const fileName = this.setImageName(file.name, newFileName);

    const path = `${this.imageFolder}/${fileName}`;
    const uploadTask = this.angularFireStorage.upload(path,file);

    const imageFullPath = (await uploadTask).ref.fullPath;       //---- 'images/vlcsnap-2023-11-02-11h47m16s161.jpg' ----
    const imageName = (await uploadTask).ref.name;       //---- 'vlcsnap-2023-11-02-11h47m16s161.jpg' ---- Valeur à stocker dans la bd -----------

    this.getImageFromStorage(this.imageFolder,imageName);

  }

  setImageName(oldFileName: string, newFileName: string){
    let tabName: string[] = oldFileName.split('.');
    const extension = (tabName.length > 0) ? tabName[tabName.length - 1] : '';
    const newName = extension !== '' ? newFileName.replaceAll(' ','_')+'.'+extension : '';
    return newName;
  }

  deleteImageFromStorage(imageFolder: string = 'images',imageName: any = 'LOGO_CRTV_bon.png'){
    const imageFullPath = imageFolder+'/'+imageName;
    this.angularFireStorageReference = this.angularFireStorage.ref(imageFullPath);
    this.angularFireStorageReference.delete()
  }

  getImageFromStorage(imageFolder: string = 'images',imageName: string = 'vlcsnap-2023-11-02-11h47m16s161.jpg') {

    // const imageFullPath = (await uploadTask).ref.fullPath;       //---- 'images/vlcsnap-2023-11-02-11h47m16s161.jpg' ----
    // const imageName = (await uploadTask).ref.name;       //---- 'vlcsnap-2023-11-02-11h47m16s161.jpg' ----

    const imageFullPath = imageFolder+'/'+imageName;
    this.angularFireStorage.ref(imageFullPath).getDownloadURL().subscribe(
      val => {
        this.imageUrl = val;
        console.log(imageFullPath,imageName,val);
      }
    );

  }




}
