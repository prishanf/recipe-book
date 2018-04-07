import { ShoppingListPopoverPage } from './../pages/shopping-list/shopping-lits-options/shopping-list-options';
import { AuthService } from './../services/auth.service';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { RecipeService } from './../services/recipe.service';
import { ShoppingListService } from './../services/shopping-list.service';
import { TabsPage } from './../pages/tabs/tabs';
import { RecipeFormPage } from './../pages/recipe-form/recipe-form';
import { ShoppingListPage } from './../pages/shopping-list/shopping-list';
import { RecipesPage } from './../pages/recipes/recipes';
import { RecipePage } from './../pages/recipe/recipe';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    RecipeFormPage,
    TabsPage,
    SigninPage,
    SignupPage,
    ShoppingListPopoverPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    RecipeFormPage,
    TabsPage,
    SigninPage,
    SignupPage,
    ShoppingListPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipeService,AuthService
  ]
})
export class AppModule {}
