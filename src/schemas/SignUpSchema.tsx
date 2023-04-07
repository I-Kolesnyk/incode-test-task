import * as yup from 'yup';
import { validationErrors, passwordRegex } from 'utils';

const {
  minFullName,
  maxFullName,
  required,
  minUsername,
  maxUsername,
  minPassword,
  maxPassword,
  matchPassword,
  confirm,
} = validationErrors;

export const SignUpSchema = yup.object().shape({
  displayName: yup
    .string()
    .required(required)
    .min(3, minFullName)
    .max(20, maxFullName),
  username: yup
    .string()
    .required(required)
    .min(3, minUsername)
    .max(20, maxUsername),
  password: yup
    .string()
    .required(required)
    .min(3, minPassword)
    .max(20, maxPassword)
    .matches(passwordRegex, matchPassword),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], confirm)
    .required(required),
});
