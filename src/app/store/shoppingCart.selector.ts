// Step 4

import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

// Instantiating the store
export const selectShoppingCartState = (state:AppState) => state.shoppingCart;

// For CartList present in Store
export const selectShoppingCart = createSelector(selectShoppingCartState, (state) => {
   return state.cartList
});

// For Quantity present in Store
export const selectShoppingCartQuantity = createSelector(selectShoppingCartState, (state) => state.quantity);