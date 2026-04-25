import { rootReducer } from './store';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { feedReducer } from './slices/feedSlice';
import { orderInfoReducer } from './slices/orderInfoSlice';
import { userReducer } from './slices/userSlice';
import { constructorReducer } from './slices/constructorSlice';
import { burgerOrderReducer } from './slices/burgerOrderSlice';
import { profileOrdersReducer } from './slices/profileOrdersSlice';

describe('rootReducer', () => {
  it('должен возвращать корректное начальное состояние', () => {
    const initAction = { type: '@@INIT' };

    const state = rootReducer(undefined, initAction);

    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, initAction),
      feed: feedReducer(undefined, initAction),
      orderInfo: orderInfoReducer(undefined, initAction),
      user: userReducer(undefined, initAction),
      burgerConstructor: constructorReducer(undefined, initAction),
      burgerOrder: burgerOrderReducer(undefined, initAction),
      profileOrders: profileOrdersReducer(undefined, initAction)
    });
  });
});
