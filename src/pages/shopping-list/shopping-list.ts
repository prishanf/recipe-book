import { ShoppingListPopoverPage } from './shopping-lits-options/shopping-list-options';
import { Ingrediant } from './../../models/ingrediant.model';
import { ShoppingListService } from './../../services/shopping-list.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PopoverController } from 'ionic-angular';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingList :Array<Ingrediant>=[];

  constructor(private shoppingListService: ShoppingListService,private popoverCtrl: PopoverController){
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
      const popover = this.popoverCtrl.create(ShoppingListPopoverPage);
      popover.present({
        ev:event
      });
  }

}
