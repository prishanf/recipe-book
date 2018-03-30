import { Ingrediant } from './../../models/ingrediant.model';
import { ShoppingListService } from './../../services/shopping-list.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingList :Array<Ingrediant>=[];

  constructor(private shoppingListService: ShoppingListService){
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

}
