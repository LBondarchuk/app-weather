import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../Inputs/Input/Input';
import { formFields } from '../../../data/loginData';
import { ModalForm } from '../../Forms/ModalForm/ModalForm';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import { useUser } from '../../../providers/UserProvider/UserProvider';
import LoadingButton from '@mui/lab/LoadingButton';
import CustomLoadingButton from '../../Buttons/LoadingButton/LoadingButton';

interface FormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const { setFormVariant, setShowUserForm } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const { email, password } = data;

      await signInWithEmailAndPassword(auth, email, password);
      setShowUserForm(false);
    } catch (error) {
      setError('email', { message: 'Invalid email or password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalForm onSubmit={handleSubmit(onSubmit)}>
      <h3 className='text-lg leading-6 mb-4 text-center text-[40px] font-bold text-main'>
        Sign In
      </h3>
      {formFields.map((field, index) => (
        <React.Fragment key={field.name}>
          <Input
            register={register}
            registerOptions={field.registerOptions}
            placeholder={field.placeholder}
            label={field.label}
            type={field.type}
            name={field.name}
          />
          {errors && (index === 0 ? errors.email : errors.password) && (
            <span className='text-red-500 translate-y-[-15px]'>
              {index === 0 ? errors.email?.message : errors.password?.message}
            </span>
          )}
        </React.Fragment>
      ))}
      <CustomLoadingButton loading={loading} text='Log In' />

      <div className='flex justify-end'>
        <span className='text-gray-400'>
          Need an account?{' '}
          <button
            className='text-main transition hover:opacity-50'
            onClick={() => setFormVariant('signUp')}
          >
            Sign Up
          </button>
        </span>
      </div>
    </ModalForm>
  );
};

export default SignIn;
