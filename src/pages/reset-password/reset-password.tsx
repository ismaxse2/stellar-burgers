import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { resetPasswordApi } from '@api';
import { ResetPasswordUI } from '@ui-pages';
import { useForm } from '../../hooks/useForm';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<Error | null>(null);
  const { values, setValues } = useForm({
    password: '',
    token: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    resetPasswordApi({
      password: values.password,
      token: values.token
    })
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate('/login');
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={error?.message}
      password={values.password}
      token={values.token}
      setPassword={(password) =>
        setValues((prevState) => ({
          ...prevState,
          password:
            typeof password === 'function'
              ? password(prevState.password)
              : password
        }))
      }
      setToken={(token) =>
        setValues((prevState) => ({
          ...prevState,
          token: typeof token === 'function' ? token(prevState.token) : token
        }))
      }
      handleSubmit={handleSubmit}
    />
  );
};
