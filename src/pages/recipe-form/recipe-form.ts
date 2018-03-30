import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'page-recipe-form',
  templateUrl: 'recipe-form.html',
})
export class RecipeFormPage implements OnInit {

  mode: string='';
  selectDifficultyOptions =['Easy','Medium','Hard'];
  recipeForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeForm();
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
  }

  onSubmit(){
    console.log(this.recipeForm);
    
  }

  private initializeForm(){
    this.recipeForm = new FormGroup({
      title : new FormControl(null,Validators.required),
      description : new FormControl(null,Validators.required),
      difficulty: new FormControl('Medium',Validators.required)  
    });
  }

}
