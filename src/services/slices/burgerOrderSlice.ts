import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

type TBurgerOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: TBurgerOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const createBurgerOrder = createAsyncThunk(
  'burgerOrder/create',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);

    return {
      ...response.order,
      ingredients
    } as TOrder;
  }
);

const burgerOrderSlice = createSlice({
  name: 'burgerOrder',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.orderModalData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBurgerOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createBurgerOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createBurgerOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка оформления заказа';
      });
  }
});

export const burgerOrderReducer = burgerOrderSlice.reducer;
export const { clearOrderModalData } = burgerOrderSlice.actions;

export const getOrderRequest = (state: RootState) =>
  state.burgerOrder.orderRequest;
export const getOrderModalData = (state: RootState) =>
  state.burgerOrder.orderModalData;
export const getBurgerOrderError = (state: RootState) =>
  state.burgerOrder.error;
