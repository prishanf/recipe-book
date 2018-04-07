import { AuthService } from './../../services/auth.service';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, private authService: AuthService,private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  onSignin(form:NgForm){
    const loading = this.loadingCtrl.create({
        content: 'Please Wait..'
    })
    loading.present();
    console.log('logoin success');
    this.authService.signin(form.value.email,form.value.password)
    .then(data=>{
      loading.dismiss();
      console.log('logoin success');
      
      this.navCtrl.popToRoot();
    })
    .catch(error =>{
      loading.dismiss();
      const alert = this.alertCtrl.create({
          title: 'Error Login',
          message: error.messgae,
          buttons:['Ok']
      });
      alert.present();
    });
  }
 

}
