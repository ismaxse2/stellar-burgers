import {
  burgerOrderReducer,
  createBurgerOrder,
  clearOrderModalData
} from './burgerOrderSlice';
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

describe('burgerOrderSlice', () => {
  it('должен устанавливать orderRequest=true при pending', () => {
    const state = burgerOrderReducer(
      undefined,
      createBurgerOrder.pending('', ['bun-1', 'main-1'])
    );

    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
    expect(state.orderModalData).toBeNull();
  });

  it('должен сохранять orderModalData и устанавливать orderRequest=false при fulfilled', () => {
    const state = burgerOrderReducer(
      undefined,
      createBurgerOrder.fulfilled(mockOrder, '', ['bun-1', 'main-1'])
    );

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ошибку и устанавливать orderRequest=false при rejected', () => {
    const state = burgerOrderReducer(
      undefined,
      createBurgerOrder.rejected(new Error('Ошибка оформления заказа'), '', [
        'bun-1',
        'main-1'
      ])
    );

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка оформления заказа');
  });

  it('должен очищать orderModalData через clearOrderModalData', () => {
    const initialState = {
      orderRequest: false,
      orderModalData: mockOrder,
      error: 'Ошибка'
    };

    const state = burgerOrderReducer(initialState, clearOrderModalData());

    expect(state.orderModalData).toBeNull();
    expect(state.error).toBeNull();
  });
});
