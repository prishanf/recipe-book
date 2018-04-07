import { AuthService } from './auth.service';
import { Services } from "@angular/core/src/view";
import { Injectable } from '@angular/core';
import { Ingrediant } from "../models/ingrediant.model";
import { HttpClient } from "@angular/common/http";
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {

    constructor(private http:HttpClient,private authService:AuthService){

    }
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

    storeList(token: string){
        const userId= this.authService.getActiveUser().uid;
        return this.http.put('https://recipebook-f1cff.firebaseio.com/'+ userId +'/shopping-list.json?auth=' + token,
            this.shoppingList);
    }

    fetchList(token: string){
        const userId= this.authService.getActiveUser().uid;
        return this.http.get('https://recipebook-f1cff.firebaseio.com/'+ userId +'/shopping-list.json?auth=' + token)
        .do((data :Ingrediant[])=>{
            this.shoppingList = data;
        })
    }
}