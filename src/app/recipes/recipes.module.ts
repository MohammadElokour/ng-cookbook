import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { RecipeDashboardComponent } from './recipe-dashboard/recipe-dashboard.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeService } from './recipe.service'
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'recipe', component: RecipeListComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'dashboard', component: RecipeDashboardComponent }
]


@NgModule({
  declarations: [RecipeDashboardComponent, RecipeDetailComponent, RecipeListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [RecipeService]
})

export class RecipesModule { }
