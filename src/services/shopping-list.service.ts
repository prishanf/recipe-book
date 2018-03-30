import { Services } from "@angular/core/src/view";
import { Injectable } from '@angular/core';
import { Ingrediant } from "../models/ingrediant.model";

@Injectable()
export class ShoppingListService {

    private shoppingList :Ingrediant[] =[];

    addItem(name:string,amount:number){
        this.shoppingList.push(new Ingrediant(name,amount));
    }

    addItems(items:Ingrediant[]){
        this.shoppingList.push(...items);
    }

    getItems(): Ingrediant[] {
        return this.shoppingList.slice();
    }

    removeItem(index: number){
        this.shoppingList.splice(index,1);
    }
}