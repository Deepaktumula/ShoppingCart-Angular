// Step 2

import { createReducer, on } from "@ngrx/store";
import { decrementCart, incrementCart, orderSuccess } from "./shoppingCart.action";
import { toasterInstance } from "../app.component";

// Creating the Reducers for the mentioned Actions & intial States of Cart
export interface shoppinCartState{
    quantity : number;
    cartList : Map<number, number>;
}

// Intializing the Cart
export const initialCartState : shoppinCartState = {
    quantity : 0,
    cartList : new Map<number, number>()
}

// Creating the reducer Implementation of state
export const reducer = createReducer(
initialCartState,

// Add to Cart Function
on(incrementCart, (state, {cartList})=>{
    if(state.cartList.has(cartList.productId)){
        state.cartList.set(cartList.productId, (state.cartList.get(cartList.productId)!) + (cartList.productQuantity));
            toasterInstance.info("Product quantity got updated successfully",'', {
                timeOut: 3000,
                closeButton:true,
                progressBar:true,
                positionClass:'toast-top-center'
            });
        }else{
            state.cartList.set(cartList.productId, cartList.productQuantity);
            toasterInstance.success("Product added to the cart successfully",'', {
                timeOut: 3000,
                closeButton:true,
                progressBar:true,
                positionClass:'toast-top-center'
            });
        }
        console.log("UpdatedCartList is :: ", state.cartList);
        console.log("Total Quantity is :: ", state.quantity + cartList.productQuantity);
        return {
            ...state,
            quantity: state.quantity + cartList.productQuantity,
            cartList:state.cartList
        }
    }),
        
// Remove From Cart Function
on(decrementCart, (state, {cartList}) =>{
    if(state.cartList.has(cartList.productId)){
        if(state.cartList.get(cartList.productId) === cartList.productQuantity){
            state.cartList.delete(cartList.productId);
                toasterInstance.error("Product removed from the cart successfully",'', {
                    timeOut: 3000,
                    closeButton:true,
                    progressBar:true,
                    positionClass:'toast-top-center'
                });
                console.log("UpdatedCartList is :: ", state.cartList);
                console.log("Total Quantity is :: ", state.quantity - cartList.productQuantity);
                return {
                    ...state,
                    quantity: state.quantity - cartList.productQuantity,
                    cartList:state.cartList
                }
        }else if(state.cartList.get(cartList.productId)! > (cartList.productQuantity)){
            state.cartList.set((cartList.productId), (state.cartList.get(cartList.productId)! - (cartList.productQuantity)));
                toasterInstance.info("Product quatity got updated successfully",'', {
                    timeOut: 3000,
                    closeButton:true,
                    progressBar:true,
                    positionClass:'toast-top-center'
                });
                console.log("UpdatedCartList is :: ", state.cartList);
                console.log("Total Quantity is :: ", state.quantity - cartList.productQuantity);
                return {
                    ...state,
                    quantity: state.quantity - cartList.productQuantity,
                    cartList:state.cartList
                }
        }else{
            toasterInstance.warning("Selected quantity to remove is greater than available in the cart.",'', {
                timeOut: 3000,
                closeButton:true,
                progressBar:true,
                positionClass:'toast-top-center'
                });
        }
    }else{
        toasterInstance.warning("Add the Product to the Cart to remove.",'', {
            timeOut: 3000,
            closeButton:true,
            progressBar:true,
            positionClass:'toast-top-center'
            });
        }
            return state;
        }),

// Order Success Method
on(orderSuccess, () => {
    return{
        quantity:0,
        cartList:new Map()
    }
})
)
