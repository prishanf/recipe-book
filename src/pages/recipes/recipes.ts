import { RecipePage } from './../recipe/recipe';
import { RecipeService } from './../../services/recipe.service';
import { Recipe } from './../../models/recipe.model';
import { RecipeFormPage } from './../recipe-form/recipe-form';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  
  recipes: Recipe[] = [];
  
  constructor(public navCtrl: NavController,private recipeService: RecipeService) {
  }

  onNewRecipe(){
    this.navCtrl.push(RecipeFormPage,{ mode:'New' });
  }

  onShowRecipe(index:number,recipe: Recipe){
    this.navCtrl.push(RecipePage,{recipe:recipe,index:index});
  }

  ionViewWillEnter(){
    this.recipes = this.recipeService.getRecipes();
  }

}
