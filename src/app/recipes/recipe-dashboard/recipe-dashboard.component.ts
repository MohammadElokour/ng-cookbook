import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { RecipeService } from '../recipe.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-dashboard',
  templateUrl: './recipe-dashboard.component.html',
  styleUrls: ['./recipe-dashboard.component.css']
})
export class RecipeDashboardComponent implements OnInit {
  title: string;
  image: string = null;
  description: string
  ingredients: string;
  steps: string;
  buttonText: string = "Add Recipe";
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private auth: AuthService, private recipeService: RecipeService, private storage: AngularFireStorage ) { }

  ngOnInit() {
  }

  addRecipe() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      description: this.description,
      image: this.image,
      published: new Date(),
      title: this.title,
      ingredients: this.ingredients, 
      steps: this.steps
    };
    this.recipeService.create(data);
    this.title = '';
    this.description = '';
    this.ingredients = '';
    this.steps = '';
    this.image = '';
    this.buttonText = 'Recipe Added!'
    setTimeout(() => (this.buttonText = 'Add Recipe'), 3000);
  }

  uploadImage(event) {
    const file = event.target.files[0];
    const path = `Cookbook/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('please only upload an image file')
    } else {
      const task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      this.uploadPercent = task.percentageChanges();
      console.log('Image uploaded!');
      task.snapshotChanges().pipe(finalize(() => {
          this.downloadURL = ref.getDownloadURL()
          this.downloadURL.subscribe(url => (this.image = url));
        })
      ).subscribe();
    }
  }
}
