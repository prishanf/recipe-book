import { AuthService } from './../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController,private authService :AuthService, 
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  onSignup(form:NgForm){
    const loading = this.loadingCtrl.create({
      content:'Signin you up...'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
      .then(data=>{
          console.log('signup success');
          loading.dismiss();
          this.navCtrl.popToRoot();
      })
      .catch(error =>{
        loading.dismiss();
        console.log(error);
        const alert = this.alertCtrl.create({
            title: 'Signup failed!',
            message: error.message,
            buttons:['Ok']
        });
        alert.present();
      });

  }
}
