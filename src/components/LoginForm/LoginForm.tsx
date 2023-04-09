import React, { FC, useCallback } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IUserLogin } from 'types';
import { userSignIn } from 'redux/auth/operations';
import { useAppDispatch } from 'hooks';
import { SignInSchema } from 'schemas';
import { Button, Form, Input } from 'antd';

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: yupResolver(SignInSchema),
  });

  const loginUser: SubmitHandler<IUserLogin> = useCallback(
    user => {
      dispatch(userSignIn(user));
    },
    [dispatch]
  );

  return (
    <Form onFinish={handleSubmit(loginUser)} layout="vertical">
      <Controller
        name="username"
        control={control}
        defaultValue=""
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
