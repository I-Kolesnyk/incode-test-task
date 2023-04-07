import * as yup from 'yup';
import { validationErrors } from 'utils';

const { required } = validationErrors;

export const SignInSchema = yup.object().shape({
  username: yup.string().required(required),
  password: yup.string().required(required),
});
