import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  products: [
    {
      id: nanoid(),
      name: 'CRM Pro License',
      description: 'Full license for CRM Pro edition',
      price: 499,
    },
    {
      id: nanoid(),
      name: 'Consulting Hours',
      description: '10 hours CRM customization',
      price: 1500,
    },
  ],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: {
      reducer(state, action) {
        state.products.push(action.payload);
      },
      prepare(product) {
        return { payload: { ...product, id: nanoid() } };
      },
    },
    updateProduct(state, action) {
      const { id, name, description, price } = action.payload;
      const existingProduct = state.products.find((p) => p.id === id);
      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.description = description;
        existingProduct.price = price;
      }
    },
    deleteProduct(state, action) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
