// Step 1

// Creating the Actions for Shopping Cart

import { createAction, props } from "@ngrx/store";

export const incrementCart = createAction('incrementCart', props<{cartList:{productId:number, productQuantity:number}}>());

export const decrementCart = createAction('decrementCart', props<{cartList:{productId:number, productQuantity:number}}>());

export const orderSuccess = createAction('orderSuccess');