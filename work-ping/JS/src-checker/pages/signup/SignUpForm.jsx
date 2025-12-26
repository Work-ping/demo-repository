import { Button, FormCheck } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextFormInput from '../../components/form/TextFormInput';
import PasswordFormInput from '../../components/form/PasswordFormInput';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6).required('Password is required'),
});

const SignUpForm = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Signup Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextFormInput
        name="name"
        label="Name"
        placeholder="Enter your name"
        control={control}
      />

      <TextFormInput
        name="email"
        label="Email"
        placeholder="Enter your email"
        control={control}
      />

      <PasswordFormInput
        name="password"
        label="Password"
        placeholder="Enter password"
        control={control}
      />

      <FormCheck
        label="I accept Terms & Conditions"
        className="mb-3"
      />

      <Button type="submit" className="w-100">
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
