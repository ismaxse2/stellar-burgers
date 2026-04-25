import { profileOrdersReducer, fetchProfileOrders } from './profileOrdersSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Тестовый бургер',
    createdAt: '2026-04-22',
    updatedAt: '2026-04-22',
    number: 12345,
    ingredients: ['bun-1', 'main-1']
  }
];

describe('profileOrdersSlice', () => {
  it('должен устанавливать isLoading=true при pending', () => {
    const state = profileOrdersReducer(
      undefined,
      fetchProfileOrders.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual([]);
  });

  it('должен сохранять orders и устанавливать isLoading=false при fulfilled', () => {
    const state = profileOrdersReducer(
      undefined,
      fetchProfileOrders.fulfilled(mockOrders, '', undefined)
    );

    expect(state.orders).toEqual(mockOrders);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ошибку и устанавливать isLoading=false при rejected', () => {
    const state = profileOrdersReducer(
      undefined,
      fetchProfileOrders.rejected(
        new Error('Ошибка загрузки истории заказов'),
        '',
        undefined
      )
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки истории заказов');
  });
});
