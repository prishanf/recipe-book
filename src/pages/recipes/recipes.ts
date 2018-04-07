import { ShoppingListPopoverPage } from './../shopping-list/shopping-lits-options/shopping-list-options';
import { RecipePage } from './../recipe/recipe';
import { RecipeService } from './../../services/recipe.service';
import { Recipe } from './../../models/recipe.model';
import { RecipeFormPage } from './../recipe-form/recipe-form';
import { Component } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  
  recipes: Recipe[] = [];
  
  constructor(public navCtrl: NavController,private recipeService: RecipeService,
  private loadingCtrl:LoadingController,
  private popoverCtrl: PopoverController,
  private authSerice: AuthService,
  private alertCtrl: AlertController ) {
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

  onShowOptions(event:any){
    const loading = this.loadingCtrl.create({
      content:'Please Wait..'
    });
    const popover = this.popoverCtrl.create(ShoppingListPopoverPage);
    popover.present({
      ev:event
    });
    popover.onDidDismiss(data=>{
      if(!data){
        return;
      }
      if(data.action=='load'){
        loading.present();
        this.authSerice.getActiveUser().getToken()
          .then((token:string)=>{
              //save data to shopping list via shopping list service
            this.recipeService.fetchList(token).subscribe(
              (list: Recipe[])=>{
                if(list){
                  this.recipes = list;
                }else{
                  this.recipes = [];
                }
                loading.dismiss();
              },
              error=>{
                console.log(error);
                loading.dismiss();
                this.handleError(error.statusText);
              }
            )
          })
          .catch(error=>{
            console.log(error);
            this.handleError(error.message);
          });

      }else if(data.action=='store'){
        loading.present();
        this.authSerice.getActiveUser().getToken()
          .then((token:string)=>{
              //save data to shopping list via shopping list service
            this.recipeService.storeList(token).subscribe(
              ()=>{
                console.log('Success!');
                loading.dismiss();
              },
              error=>{
                console.log(error);
                loading.dismiss();
                this.handleError(error.statusText);
              }
            )
          })
          .catch(error=>{
            console.log(error);
            this.handleError(error.message);
            
          });
      }
    })
}

  private handleError(errorMessage: string){
    const alert = this.alertCtrl.create({
      title: 'Error',
      message: errorMessage,
      buttons:['Ok']
    });
    alert.present();
  }

}
