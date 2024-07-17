import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IProduct {
  id : string , 
  titile : string , 
  img : string, 
  price : number,
  quantity : number,

}
const initialState : Array<IProduct> = [];


export const cartSlice = createSlice({
  name : 'cartSlice',
  initialState , 
  reducers : {
    addToCart : (state : Array<IProduct>  , action : PayloadAction<IProduct>) => {
      const product : IProduct = action.payload;
      
      if(state.findIndex( cartProduct => cartProduct.id === product.id) !== -1){
        return [...state , product]; // add the product to the cart
      }
      else {
        // increment the quantity
        state.map((cartProduct) => {
          return cartProduct.id === product.id ? {...cartProduct , quantity : cartProduct.quantity + 1} : cartProduct;
        })
      }
    },
    removeFromCart : (state : Array<IProduct> , action : PayloadAction<string>) => {
      const productId : string = action.payload;
      return state.filter(product => product.id !== productId);
    }
  }
})

export const { addToCart , removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;




