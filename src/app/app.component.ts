import { AuthService } from './../services/auth.service';
import { firebaseSettings } from './../firebase-config';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;
  @ViewChild('nav') nav:NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl:MenuController,
    private authService : AuthService) {
    firebase.initializeApp(firebaseSettings);
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      }else{
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    })
  }
  
  onLoad(page:any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  logout(){
    this.authService.logout();
    this.menuCtrl.close();
  }
}