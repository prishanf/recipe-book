import { NgForm } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, ) {
  }

  onSignin(form:NgForm){
    console.log(form.value);
  }
 

}
