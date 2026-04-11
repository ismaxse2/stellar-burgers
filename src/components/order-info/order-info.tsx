import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import {
  clearOrderInfo,
  fetchOrderByNumber,
  getOrderInfoData,
  getOrderInfoError,
  getOrderInfoLoading
} from '../../services/slices/orderInfoSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();

  const ingredients = useSelector(getIngredients);
  const orderData = useSelector(getOrderInfoData);
  const isLoading = useSelector(getOrderInfoLoading);
  const error = useSelector(getOrderInfoError);

  useEffect(() => {
    const orderNumber = Number(number);

    if (orderNumber) {
      dispatch(fetchOrderByNumber(orderNumber));
    }

    return () => {
      dispatch(clearOrderInfo());
    };
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);

          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count += 1;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading || !ingredients.length) {
    return <Preloader />;
  }

  if (error) {
    return <div className='text text_type_main-medium pt-10'>{error}</div>;
  }

  if (!orderInfo) {
    return (
      <div className='text text_type_main-medium pt-10'>
        Не удалось загрузить данные заказа
      </div>
    );
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
