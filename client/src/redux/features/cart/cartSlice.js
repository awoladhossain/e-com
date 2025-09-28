import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExisting = state.products.find(
        (item) => item._id === action.payload._id
      );
      console.log(isExisting);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
