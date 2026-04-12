import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

type TOrderInfoState = {
  orderData: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderInfoState = {
  orderData: null,
  isLoading: false,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk(
  'orderInfo/fetchByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);

    if (!data.success || !data.orders.length) {
      throw new Error('Не удалось получить заказ');
    }

    return data.orders[0];
  }
);

const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
    clearOrderInfo: (state) => {
      state.orderData = null;
      state.isLoading = false;
      state.error = null;
    },
    setOrderInfo: (state, action: PayloadAction<TOrder>) => {
      state.orderData = action.payload;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки заказа';
      });
  }
});

export const orderInfoReducer = orderInfoSlice.reducer;
export const { clearOrderInfo, setOrderInfo } = orderInfoSlice.actions;

export const getOrderInfoData = (state: RootState) => state.orderInfo.orderData;
export const getOrderInfoLoading = (state: RootState) =>
  state.orderInfo.isLoading;
export const getOrderInfoError = (state: RootState) => state.orderInfo.error;
