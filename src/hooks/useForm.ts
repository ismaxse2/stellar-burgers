import { ChangeEvent, useState } from 'react';

type TFormValues = Record<string, string>;

export const useForm = <T extends TFormValues>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setValues((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return { values, handleChange, setValues };
};
