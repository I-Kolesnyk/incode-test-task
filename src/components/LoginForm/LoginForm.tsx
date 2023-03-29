import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    formState,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      password: '',
    },
  });

  const loginUser = (user: { name: string; password: string }) => {
    console.log(user);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(loginUser)}>
      <label>
        <input
          type="text"
          placeholder="Example123"
          autoComplete="off"
          {...register('name')}
        />
        {errors.name && <div>{errors.name?.message}</div>}
      </label>
      <label>
        <input
          type="password"
          placeholder="***************"
          autoComplete="off"
          {...register('password')}
        />
        {errors.password && <div>{errors.password?.message}</div>}
      </label>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default LoginForm;
