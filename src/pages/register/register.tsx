import { FC, SyntheticEvent } from 'react';
import { RegisterUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getUserError, registerUser } from '../../services/slices/userSlice';
import { useForm } from '../../hooks/useForm';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorText = useSelector(getUserError) || '';
  const { values, setValues } = useForm({
    userName: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      registerUser({
        name: values.userName,
        email: values.email,
        password: values.password
      })
    ).then((result) => {
      if (registerUser.fulfilled.match(result)) {
        navigate('/', { replace: true });
      }
    });
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={values.email}
      userName={values.userName}
      password={values.password}
      setEmail={(email) =>
        setValues((prevState) => ({
          ...prevState,
          email: typeof email === 'function' ? email(prevState.email) : email
        }))
      }
      setPassword={(password) =>
        setValues((prevState) => ({
          ...prevState,
          password:
            typeof password === 'function'
              ? password(prevState.password)
              : password
        }))
      }
      setUserName={(userName) =>
        setValues((prevState) => ({
          ...prevState,
          userName:
            typeof userName === 'function'
              ? userName(prevState.userName)
              : userName
        }))
      }
      handleSubmit={handleSubmit}
    />
  );
};
