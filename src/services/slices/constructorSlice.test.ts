import {
  constructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from './constructorSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

const bun: TIngredient = {
  _id: 'bun-1',
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
};

const main1: TIngredient = {
  _id: 'main-1',
  name: 'Котлета 1',
  type: 'main',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 1,
  image: 'img',
  image_large: 'img-large',
  image_mobile: 'img-mobile'
};

const main2: TConstructorIngredient = {
  _id: 'main-2',
  name: 'Котлета 2',
  type: 'main',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 1,
  image: 'img',
  image_large: 'img-large',
  image_mobile: 'img-mobile',
  id: 'uuid-2'
};

const main3: TConstructorIngredient = {
  _id: 'main-3',
  name: 'Котлета 3',
  type: 'main',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 1,
  image: 'img',
  image_large: 'img-large',
  image_mobile: 'img-mobile',
  id: 'uuid-3'
};

describe('constructorSlice', () => {
  it('должен добавлять булку в state.bun', () => {
    const state = constructorReducer(undefined, addIngredient(bun));

    expect(state.bun?._id).toBe('bun-1');
    expect(state.ingredients).toEqual([]);
  });

  it('должен добавлять начинку в state.ingredients', () => {
    const state = constructorReducer(undefined, addIngredient(main1));

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('main-1');
    expect(state.ingredients[0]).toHaveProperty('id');
  });

  it('должен удалять ингредиент по id', () => {
    const initialState = {
      bun: null,
      ingredients: [main2, main3]
    };

    const state = constructorReducer(initialState, removeIngredient('uuid-2'));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].id).toBe('uuid-3');
  });

  it('должен перемещать ингредиент вверх', () => {
    const initialState = {
      bun: null,
      ingredients: [main2, main3]
    };

    const state = constructorReducer(initialState, moveIngredientUp(1));

    expect(state.ingredients[0].id).toBe('uuid-3');
    expect(state.ingredients[1].id).toBe('uuid-2');
  });

  it('должен перемещать ингредиент вниз', () => {
    const initialState = {
      bun: null,
      ingredients: [main2, main3]
    };

    const state = constructorReducer(initialState, moveIngredientDown(0));

    expect(state.ingredients[0].id).toBe('uuid-3');
    expect(state.ingredients[1].id).toBe('uuid-2');
  });
});
