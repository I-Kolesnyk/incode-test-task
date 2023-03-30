import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { userSignUp } from 'redux/auth/operations';
import { AppDispatch } from 'redux/store';

type FormData = {
  username: string;
  password: string;  
  displayName: string;
};

const RegisterForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

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
      displayName: '',      
    },
  });

  const registerUser = (user: FormData) => {
    dispatch(userSignUp(user));
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(registerUser)}>
      <label>
        Full Name
        <input
          type="text"
          placeholder="Example Name"
          autoComplete="off"
          {...register('username')}
        />
        {errors.username && <div>{errors.username?.message}</div>}
      </label>
      <label>
        Full Name
        <input
          type="text"
          placeholder="Example123"
          autoComplete="off"
          {...register('displayName')}
        />
        {errors.username && <div>{errors.username?.message}</div>}
      </label>
      <label>
        Password
        <input type="password" autoComplete="off" {...register('password')} />
        {errors.password && <div>{errors.password?.message}</div>}
      </label>
      {/* <label>
        Confirm Password
        <input
          type="password"
          autoComplete="off"
          {...register('confirmPassword')}
        />
        {errors.password && <div>{errors.password?.message}</div>}
      </label> */}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default RegisterForm;
