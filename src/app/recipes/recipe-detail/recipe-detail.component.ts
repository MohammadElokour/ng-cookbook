import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  
  recipe: Recipe;
  editing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService,
    private recipeService: RecipeService,

  ) { }

  ngOnInit() {
    this.getRecipe();
  }

  getRecipe() {
    const id = this.route.snapshot.paramMap.get("id");
    return this.recipeService.getRecipeData(id).subscribe(data => this.recipe = data);
  }

  updateRecipe() {
    const formData = {
      title: this.recipe.title,
      description: this.recipe.description,
      ingredients: this.recipe.ingredients,
      steps: this.recipe.steps
    }
    const id = this.route.snapshot.paramMap.get("id");
    this.recipeService.update(id, formData);
    this.editing = false;
  }

  delete(){
    const id = this.route.snapshot.paramMap.get("id");
    this.recipeService.delete(id);
    this.router.navigate(["/recipe"]);
  }

  
}
