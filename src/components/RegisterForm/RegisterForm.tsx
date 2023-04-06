import React, { FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { userSignUp } from 'redux/auth/operations';
import { setIsNewUser } from 'redux/auth/slice';
import { AppDispatch } from 'redux/store';
import { Button, Form, Input } from 'antd';

type FormData = {
  username: string;
  password: string;
  displayName: string;
  confirmPassword: string;
};

const RegisterForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    formState,
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      displayName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const registerUser = (user: FormData) => {
    dispatch(
      userSignUp({
        password: user.password,
        username: user.username,
        displayName: user.displayName,
      })
    );

    toast.success('You have been successfully registered! Please sign in');

    setTimeout(() => {
      dispatch(setIsNewUser(false));
    }, 5000);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <Form onFinish={handleSubmit(registerUser)} layout="vertical">
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <Form.Item name="username" label={<label>Full name</label>}>
            <Input {...field} />
          </Form.Item>
        )}
      />
      <p>{errors.username?.message}</p>
      <Controller
        name="displayName"
        control={control}
        render={({ field }) => (
          <Form.Item name="displayName" label={<label>User name</label>}>
            <Input {...field} />
          </Form.Item>
        )}
      />
      <p>{errors.displayName?.message}</p>
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Form.Item name="password" label={<label>Password</label>}>
            <Input.Password {...field} />
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
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password {...field} />
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
