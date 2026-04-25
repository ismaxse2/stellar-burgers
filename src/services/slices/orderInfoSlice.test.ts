import {
  orderInfoReducer,
  fetchOrderByNumber,
  clearOrderInfo,
  setOrderInfo
} from './orderInfoSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Тестовый бургер',
  createdAt: '2026-04-22',
  updatedAt: '2026-04-22',
  number: 12345,
  ingredients: ['bun-1', 'main-1']
};

describe('orderInfoSlice', () => {
  it('должен устанавливать isLoading=true при pending', () => {
    const state = orderInfoReducer(
      undefined,
      fetchOrderByNumber.pending('', 12345)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.orderData).toBeNull();
  });

  it('должен сохранять orderData и устанавливать isLoading=false при fulfilled', () => {
    const state = orderInfoReducer(
      undefined,
      fetchOrderByNumber.fulfilled(mockOrder, '', 12345)
    );

    expect(state.orderData).toEqual(mockOrder);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ошибку и устанавливать isLoading=false при rejected', () => {
    const state = orderInfoReducer(
      undefined,
      fetchOrderByNumber.rejected(
        new Error('Не удалось получить заказ'),
        '',
        12345
      )
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Не удалось получить заказ');
  });

  it('должен очищать данные заказа через clearOrderInfo', () => {
    const initialState = {
      orderData: mockOrder,
      isLoading: true,
      error: 'Ошибка'
    };

    const state = orderInfoReducer(initialState, clearOrderInfo());

    expect(state.orderData).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('должен устанавливать данные заказа через setOrderInfo', () => {
    const state = orderInfoReducer(undefined, setOrderInfo(mockOrder));

    expect(state.orderData).toEqual(mockOrder);
    expect(state.error).toBeNull();
  });
});
