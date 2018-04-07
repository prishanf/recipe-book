import { Recipe } from './../../models/recipe.model';
import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'page-recipe-form',
  templateUrl: 'recipe-form.html',
})
export class RecipeFormPage implements OnInit {

  mode: string='';
  selectDifficultyOptions =['Easy','Medium','Hard'];
  recipeForm: FormGroup;
  recipeIngredientsArray: AbstractControl[];
  private recipe: Recipe;
  private index:number;
  constructor(
    private navParams: NavParams,
    private navCtrl:NavController,
    private actionSheetCtr: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipeService: RecipeService ) {
    
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    if(this.mode=='Edit'){
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    console.log(this.recipe,this.index);
    
    this.initializeForm();
  }
  ionViewWillEnter() {
    console.log(this.recipe,this.index);
    this.initializeForm();
  }

  onSubmit(){
    const value = this.recipeForm.value;
    let ingredients = [];
    ingredients
    if(value.ingredients.length > 0){
      ingredients = value.ingredients.map(name=>{
        return { 'name':name, 'amount':1 };
      })
    }

    if(this.mode=='Edit'){
      this.recipeService.updateRecipe(this.index,value.title,value.description,value.difficulty,ingredients);
    }else{
      this.recipeService.addRecipe(value.title,value.description,value.difficulty,ingredients);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
    
  }

  onManageIngredients(){
    const  actionSheet = this.actionSheetCtr.create({
      title:'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredients',
          handler: () => {
            const  fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if(len>0){
              for(let i = len-1;i>=0; i--){
                fArray.removeAt(i);
              }
              this.toastCtrl.create({
                message: 'All Ingredents were deleted',
                duration: 1500,
                position: 'bottom'
              }).present();  
            }
            
          }
        },
        {
          text:'Cancel',
          role:'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert(){
    const newIngredientAlert = this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: "Name"
        },
      ], 
      buttons: [
        {
          text: 'Cancel',
          role:'cancel'

        },
        {
          text: 'Add',
          handler: data => {
            if(data.name.trim()=='' || data.name == null){
              this.toastCtrl.create({
                message: 'Please Enter Valid Value',
                duration: 1500,
                position: 'bottom'
              }).present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).
              push(new FormControl(data.name,Validators.required));
            this.toastCtrl.create({
                message: 'Item Added',
                duration: 1500,
                position: 'bottom'
              }).present();  
          }
        }
      ]  
    });
    return newIngredientAlert;
  }

  private initializeForm(){
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if(this.mode =='Edit'){
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for( let ingredient of this.recipe.ingredients ){
        console.log(ingredient);
        ingredients.push(new FormControl(ingredient.name,Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      title : new FormControl(title,Validators.required),
      description : new FormControl(description,Validators.required),
      difficulty: new FormControl(difficulty,Validators.required),
      ingredients: new FormArray(ingredients)  
    });
    
  }

}
