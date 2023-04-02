import React, {FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { userSignIn } from 'redux/auth/operations';
import { AppDispatch, useAppSelector } from 'redux/store';
import { selectError } from 'redux/auth/selectors';

type FormData = {
  username: string;
  password: string;
};

const LoginForm : FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (error === 'Request failed with status code 404') {
      
        alert(
          'User is not found. Please sign up!'
       
      );
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    formState,
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const loginUser = (user: FormData) => {
    console.log(user);
    dispatch(userSignIn(user));
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
          {...register('username')}
        />
        {errors.username && <div>{errors.username?.message}</div>}
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
