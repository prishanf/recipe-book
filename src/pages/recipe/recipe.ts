import { Recipe } from './../../models/recipe.model';
import { RecipeService } from './../../services/recipe.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {

  recipe: Recipe;
  index: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,private recipeService: RecipeService) {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe(){

  }

  onDeleteRecipe(){

  }

  onAddToShoppingList(){

  }

  ionViewWillEnter(){

  }

}
