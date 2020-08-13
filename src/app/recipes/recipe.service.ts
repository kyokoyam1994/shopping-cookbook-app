import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    // private recipes : Recipe[] = [
    //     new Recipe('Pasta', 
    //     'Homemade Pasta for Pasta Lovers', 
    //     'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg',
    //     [new Ingredient('Noodles', 3), new Ingredient('Chicken', 5), new Ingredient('Spinach', 2)]),
    //     new Recipe('Pizza', 
    //     'Homemade Oven Baked Pizza', 
    //     'https://www.seriouseats.com/2017/02/20170216-detroit-style-pizza-47-1500x1125-1.jpg',
    //     [new Ingredient('Bread', 12), new Ingredient('Cheese Slices', 10), new Ingredient('Tomato Sauce', 5)])
    // ];

    private recipes : Recipe[] = [];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice(); // Returns a copy instead of a direct reference
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}