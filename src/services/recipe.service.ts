import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Ingrediant } from './../models/ingrediant.model';
import { Recipe } from './../models/recipe.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeService {
    
    private recipes: Recipe[] = [];
    
    constructor(private authService: AuthService,private http: HttpClient) { }

    addRecipe(title: string,
                description: string,
                difficulty: string,
                ingredients: Ingrediant[]){
        this.recipes.push(new Recipe(title,description,difficulty,ingredients));
    }

    getRecipes(){
        return this.recipes.slice();
    }

    updateRecipe(index:number,title: string,
                    description: string,
                    difficulty: string,
                    ingredients: Ingrediant[] ){
        this.recipes[index] = new Recipe(title,description,difficulty,ingredients);                
    }

    removeRecipe(index: number){
        this.recipes.splice(index,1);
    }

    storeList(token: string){
        const userId= this.authService.getActiveUser().uid;
        return this.http.put('https://recipebook-f1cff.firebaseio.com/'+ userId +'/recipes.json?auth=' + token,
            this.recipes);
    }

    fetchList(token: string){
        const userId= this.authService.getActiveUser().uid;
        return this.http.get('https://recipebook-f1cff.firebaseio.com/'+ userId +'/recipes.json?auth=' + token)
        .map((recipes: Recipe[])=>{
            console.log(recipes);
            for (let item of recipes) {
                if (!item.hasOwnProperty('ingredients')) {
                  item.ingredients = [];
                }
            }
            return recipes;
        })
        .do((data : Recipe[])=>{
            console.log(data);
            this.recipes = data;
        })
    }
}