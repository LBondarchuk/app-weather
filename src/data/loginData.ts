export const formFields = [
  {
    name: 'email',
    label: 'Enter your email',
    placeholder: 'Email',
    type: 'text',

    registerOptions: {
      required: 'Email is required',
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: 'Entered value does not match email format',
      },
    },
    errorMessage: 'Email is required or format is incorrect',
  },
  {
    name: 'password',
    label: 'Enter your password',
    placeholder: 'Password',
    type: 'password',

    registerOptions: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
    },
    errorMessage: 'Password is required and must be at least 8 characters long',
  },
];
