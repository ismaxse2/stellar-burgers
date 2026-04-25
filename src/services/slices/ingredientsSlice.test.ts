import { ingredientsReducer, fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 1,
    image: 'img',
    image_large: 'img-large',
    image_mobile: 'img-mobile'
  }
];

describe('ingredientsSlice', () => {
  it('должен устанавливать isLoading=true при pending', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ingredients и устанавливать isLoading=false при fulfilled', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );

    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ошибку и устанавливать isLoading=false при rejected', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.rejected(new Error('Ошибка загрузки'), '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
