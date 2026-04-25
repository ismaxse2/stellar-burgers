import {
  userReducer,
  setAuthChecked,
  fetchUser,
  loginUser,
  logoutUser
} from './userSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@test.ru',
  name: 'Тест'
};

describe('userSlice', () => {
  it('должен устанавливать isAuthChecked через setAuthChecked', () => {
    const state = userReducer(undefined, setAuthChecked(true));

    expect(state.isAuthChecked).toBe(true);
  });

  it('должен устанавливать isLoading=true при fetchUser.pending', () => {
    const state = userReducer(undefined, fetchUser.pending('', undefined));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять пользователя при fetchUser.fulfilled', () => {
    const state = userReducer(
      undefined,
      fetchUser.fulfilled(mockUser, '', undefined)
    );

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ошибку при fetchUser.rejected', () => {
    const state = userReducer(
      undefined,
      fetchUser.rejected(
        new Error('Не удалось получить пользователя'),
        '',
        undefined
      )
    );

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Не удалось получить пользователя');
  });

  it('должен авторизовывать пользователя при loginUser.fulfilled', () => {
    const state = userReducer(
      undefined,
      loginUser.fulfilled(mockUser, '', {
        email: 'test@test.ru',
        password: '123456'
      })
    );

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('должен очищать пользователя при logoutUser.fulfilled', () => {
    const initialState = {
      user: mockUser,
      isAuthChecked: true,
      isAuthenticated: true,
      isLoading: true,
      error: null
    };

    const state = userReducer(
      initialState,
      logoutUser.fulfilled(undefined, '', undefined)
    );

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
  });
});
