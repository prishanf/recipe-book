import { Ingrediant } from './../models/ingrediant.model';
import { Recipe } from './../models/recipe.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = []
    constructor() { }

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
}