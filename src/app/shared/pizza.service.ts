import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable, map } from 'rxjs';
import { IPizza } from './interfaces/pizza';
import { ICommande } from './interfaces/commande';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  public listPizzas!: Observable<IPizza[]>;

  public emptyPizza: IPizza = {
    id: '',
    pizzaName: '',
    pizzaPhoto: '',
    pizzaPrice: 0,
    pizzaDescription: ''
  }

  public emptyCommande: ICommande = {
    id: '',
    nomClient: '',
    numeroCommande: '',
    commandePizzas: [],
    refArticle: '',
    livree: false
}


  constructor( private firestore: AngularFirestore) { }


  // ------ liste des commandes ---------
  getCommandesPizza(){
    return this.firestore.collection('commandes').snapshotChanges();
  }

  // ------ liste des commandes en ajoutant les ids et sous forme d'observable ICommande[] ---------
  getCommandesPizzaWithIds() {
    return this.firestore.collection('commandes', ref => ref.orderBy('nomClient')).valueChanges({ idField: 'id' }) as Observable<ICommande[]>;
  }

  //******************* ------- Liste de Commandes pour la structure --------- ******************/
  public listeCommande$!: Observable<ICommande[]>;

  sortingObjectArrayCommande(a: any, b: any): number {
    let x = a.nomClient.toLowerCase();
    let y = b.nomClient.toLowerCase();
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
  }
  // ---------- Recupération via le serveur des listes de Commandes et tri --------
  public getCommandeFromServer(): Observable<ICommande[]> {
    return this.getCommandesPizzaWithIds().pipe(
      map(list => list.sort(this.sortingObjectArrayCommande)));
  }
  //---------- Initialise les listes de circonscriptions en les triant par ordre croissant 
  public initListeCommande() {
    this.listeCommande$ = !!this.listeCommande$ ? this.listeCommande$ : this.getCommandeFromServer();
  }








  // ----- Creationd'une commande ---------
  async addCommande(data: any){
    return await this.firestore
      .collection<ICommande>('commandes')
      .add(data)
      .then(res => { console.log('commandes, save complited') })
      .catch(err => console.log(err));
  }

  async createPizza(data: any){
    data.id = this.firestore.createId();
    return await this.firestore
      .collection('commandes')
      .add(data)
      .then(res => { console.log('commandes, save complited') })
      .catch(err => console.log(err));
  }

  
  
  // ----- mise à jourdúne commande --------
  async updatePizza(data: any){
    try {
      const res = await this.firestore
        .collection('commandes')
        .doc(data.id)
        .set({ livree: true }, { merge: true });
      console.log('commandes, update complited');
    } catch (err) {
      console.log(err);
    }
  }


    // ----- delete commande --------
  async deletePizza(id: any) {
    try {
      const res = await this.firestore
        .collection('commandes')
        .doc(id)
        .delete();
      console.log('commandes, delete complited');
    } catch (err) {
      console.log(err);
    }
  }
  
  
  // ----- get commande by id --------
  getCommandeById(id: any) {
    return this.firestore
      .collection('commandes')
      .doc(id)
      .get()
  }

  // ----- get commande by id --------
  getSingleCommandeById(id: any) {
    let itemDoc: AngularFirestoreDocument<ICommande>;
    itemDoc = this.firestore.doc<ICommande>('commandes/' + id);
    return itemDoc.valueChanges({ idField: 'id' }) as Observable<ICommande>;
  }
  


  // --------- TransCommande des données, recuperation des id ---------
  transformData(strongCommandePizzas: any[]){
    let commandePizzas: any[] = [];
    for (let index = 0; index < strongCommandePizzas.length; index++) {
      const id = strongCommandePizzas[index].payload.doc.id;
      const data = strongCommandePizzas[index].payload.doc.data();
      const doc = {id,data};
      commandePizzas.push(doc); 
    }
    return commandePizzas;
  }






}





