import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Observable<Recipe[]>
  
  constructor(private recipeService: RecipeService, public auth: AuthService ) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  delete(id: string) {
    this.recipeService.delete(id);
  }

}
