import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs/Rx';

import { Recipe } from "../recipe";
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list'

@Component({
  moduleId: module.id,
  selector: 'rb-recipe-detail',
  templateUrl: 'recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  selectedRecipe: Recipe;
  private recipeIndex: number;

  private subscription: Subscription;

  constructor(
    private sls: ShoppingListService, 
    private router: Router,
    private route: ActivatedRoute,
    private recipesService: RecipeService) {

  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.recipeIndex = params['id'];
        this.selectedRecipe = this.recipesService.getRecipe(this.recipeIndex);
      }
    );
  }

  onAddToShoppingList() {
    this.sls.addItems(this.selectedRecipe.ingredients);
  }

  onEdit() {
    this.router.navigate(['/recipes', this.recipeIndex, 'edit']);
  }

  onDelete() {
    this.recipesService.delete(this.selectedRecipe);
    this.router.navigate(['/recipes'])
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
