import { FC, SyntheticEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getUserError, loginUser } from '../../services/slices/userSlice';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const errorText = useSelector(getUserError) || '';

  const { values, setValues } = useForm({
    email: '',
    password: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      loginUser({
        email: values.email,
        password: values.password
      })
    ).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    });
  };

  return (
    <LoginUI
      errorText={errorText}
      email={values.email}
      setEmail={(email) =>
        setValues((prevState) => ({
          ...prevState,
          email: typeof email === 'function' ? email(prevState.email) : email
        }))
      }
      password={values.password}
      setPassword={(password) =>
        setValues((prevState) => ({
          ...prevState,
          password:
            typeof password === 'function'
              ? password(prevState.password)
              : password
        }))
      }
      handleSubmit={handleSubmit}
    />
  );
};
