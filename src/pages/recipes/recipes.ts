import { RecipeFormPage } from './../recipe-form/recipe-form';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(public navCtrl: NavController) {
  }

  onNewRecipe(){
    this.navCtrl.push(RecipeFormPage,{ mode:'New' });
  }

}
