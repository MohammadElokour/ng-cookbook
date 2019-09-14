import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument, 
} from 'angularfire2/firestore'
import { map } from 'rxjs/operators';
import {Recipe} from './recipe'

@Injectable()


export class RecipeService {
  recipeCollection: AngularFirestoreCollection<Recipe>;
  recipeDoc: AngularFirestoreDocument<Recipe>;

  constructor(private afs: AngularFirestore) {
    this.recipeCollection = this.afs.collection('Cookbook', ref => ref.orderBy('published', 'desc'));
  }

  getRecipes() {
    return this.recipeCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Recipe
        const id = a.payload.doc.id
        return {id, ...data}
      });
    }));
  }

  getRecipeData(id: string) {
    this.recipeDoc = this.afs.doc<Recipe>(`Cookbook/${id}`);
    return this.recipeDoc.valueChanges();
  }


  getRecipe(id: string) {
    return this.afs.doc<Recipe>(`Cookbook/${id}`)
  }

  create(data: Recipe){
    this.recipeCollection.add(data);
  }

  delete(id: string){
    return this.getRecipe(id).delete();
  }

  update(id: string, formData){
    return this.getRecipe(id).update(formData)
  }

}
