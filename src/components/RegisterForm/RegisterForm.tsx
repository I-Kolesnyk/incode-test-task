import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IUserRegistration } from 'types';
import { userSignUp } from 'redux/auth/operations';
import { setIsNewUser } from 'redux/auth/slice';
import { useAppDispatch } from 'hooks';
import { SignUpSchema } from 'schemas';
import { Button, Form, Input } from 'antd';

const RegisterForm: FC = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegistration>({
    defaultValues: {
      username: '',
      displayName: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
    resolver: yupResolver(SignUpSchema),
  });

  const registerUser = (user: IUserRegistration) => {
    console.log(user);
    dispatch(
      userSignUp({
        password: user.password,
        username: user.username,
        displayName: user.displayName,
      })
    );   

    setTimeout(() => {
      dispatch(setIsNewUser(false));
    }, 5000);
  };

  return (
    <Form onFinish={handleSubmit(registerUser)} layout="vertical">
      <Controller
        name="displayName"
        control={control}
        render={({ field }) => (
          <Form.Item name="displayName" label={<label>Full name</label>}>
            <Input {...field} placeholder={'Example Name'} />
          </Form.Item>
        )}
      />
      <p>{errors.displayName?.message}</p>
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
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Form.Item
            name="confirmPassword"
            label={<label>Confirm password</label>}
          >
            <Input.Password {...field} placeholder={'***************'} />
          </Form.Item>
        )}
      />
      <p>{errors.confirmPassword?.message}</p>
      <Button type="primary" htmlType="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default RegisterForm;
