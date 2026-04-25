import { feedReducer, fetchFeeds } from './feedSlice';
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

describe('feedSlice', () => {
  it('должен устанавливать isLoading=true при pending', () => {
    const state = feedReducer(undefined, fetchFeeds.pending('', undefined));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
  });

  it('должен сохранять orders, total и totalToday при fulfilled', () => {
    const state = feedReducer(
      undefined,
      fetchFeeds.fulfilled(
        {
          success: true,
          orders: mockOrders,
          total: 500,
          totalToday: 50
        },
        '',
        undefined
      )
    );

    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(500);
    expect(state.totalToday).toBe(50);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ошибку при rejected', () => {
    const state = feedReducer(
      undefined,
      fetchFeeds.rejected(
        new Error('Ошибка загрузки ленты заказов'),
        '',
        undefined
      )
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ленты заказов');
  });
});
