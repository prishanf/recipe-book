import { AuthService } from './../../services/auth.service';
import { ShoppingListPopoverPage } from './shopping-lits-options/shopping-list-options';
import { Ingrediant } from './../../models/ingrediant.model';
import { ShoppingListService } from './../../services/shopping-list.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PopoverController, LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingList :Array<Ingrediant>=[];

  constructor(private shoppingListService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authSerice:AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl : AlertController
  ){
  }

  ionViewWillEnter(){
    this.loadItems();
  }
    
  onAddItem(form:NgForm){
    this.shoppingListService.addItem(form.value.ingredientName,form.value.amount);
    form.reset();
    this.loadItems();
  }

  private loadItems(){
    this.shoppingList = this.shoppingListService.getItems();
  }

  onRemoveItem(index: number){
    this.shoppingListService.removeItem(index);
    this.loadItems();
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
              this.shoppingListService.fetchList(token).subscribe(
                (list: Ingrediant[])=>{
                  if(list){
                    this.shoppingList = list;
                  }else{
                    this.shoppingList = [];
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
              this.shoppingListService.storeList(token).subscribe(
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
