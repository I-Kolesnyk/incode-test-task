import React, { FC, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { userSignIn } from 'redux/auth/operations';
import { AppDispatch, useAppSelector } from 'redux/store';
import { selectError } from 'redux/auth/selectors';
import { Button, Form, Input } from 'antd';

const SignInSchema = yup.object().shape({
  username: yup.string().required('Please enter your username!'),
  password: yup.string().required('Please enter your password!'),
});

interface IFormInput {
  username: string;
  password: string;
}

const LoginForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (error === 'Request failed with status code 404') {
      alert('User is not found. Please sign up!');
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    formState,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: yupResolver(SignInSchema),
  });

  const loginUser: SubmitHandler<IFormInput> = user => {
    console.log(user);
    dispatch(userSignIn(user));
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <Form onFinish={handleSubmit(loginUser)} layout="vertical">
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <Form.Item name="username" label={<label>User name</label>}>
            <Input {...field} placeholder={'Example123'} />
          </Form.Item>
        )}
      />
      <p>{errors.username?.message}</p>
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Form.Item name="password" label={<label>Password</label>}>
            <Input.Password {...field} placeholder={'***************'} />
          </Form.Item>
        )}
      />
      <p>{errors.password?.message}</p>
      <Button type="primary" htmlType="submit">
        Sign In
      </Button>
    </Form>
  );
};

export default LoginForm;
