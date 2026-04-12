import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUser, updateUser } from '../../services/slices/userSlice';
import { useForm } from '../../hooks/useForm';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser) || {
    name: '',
    email: ''
  };

  const { values, setValues, handleChange } = useForm({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setValues({
      name: user.name || '',
      email: user.email || '',
      password: ''
    });
  }, [user, setValues]);

  const isFormChanged =
    values.name !== user.name ||
    values.email !== user.email ||
    !!values.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      updateUser({
        name: values.name,
        email: values.email,
        password: values.password
      })
    ).then((result) => {
      if (updateUser.fulfilled.match(result)) {
        setValues((prevState) => ({
          ...prevState,
          password: ''
        }));
      }
    });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setValues({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  return (
    <ProfileUI
      formValue={values}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleChange}
    />
  );
};
