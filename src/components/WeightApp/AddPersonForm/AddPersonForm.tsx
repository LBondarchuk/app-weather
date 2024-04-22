import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as createId } from 'uuid';
import Input from '../../Inputs/Input/Input';
import addPersonToUser from '../../../utils/handlers/addDataToUser';
import { useUser } from '../../../providers/UserProvider/UserProvider';
import { useState } from 'react';
import CustomLoadingButton from '../../Buttons/LoadingButton/LoadingButton';
type FieldsValue = {
  weight: string;
  name: string;
};

const AddPersonForm = () => {
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldsValue>();
  const onSubmit: SubmitHandler<FieldsValue> = async (data) => {
    if (currentUser) {
      await addPersonToUser(currentUser.id, 'people', { ...data, id: createId() }, setLoading);
    }

    reset();
  };

  return (
    <section className='w-full flex items-center justify-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-5 bg-white rounded-[30px] max-w-[500px] w-[90%] p-5'
      >
        <h2 className='text-center text-[40px] text-main'>Add person</h2>
        <div>
          <Input
            register={register}
            registerOptions={{ required: 'Name can`t be empty' }}
            name='name'
            placeholder='Enter name'
          />
          {errors.name && (
            <span className='text-red-500 translate-y-[-15px]'>{errors.name.message}</span>
          )}
        </div>
        <div>
          <Input
            register={register}
            placeholder='Enter weight'
            registerOptions={{
              required: "Weight can't be empty",
              pattern: {
                value: /^\d+$/,
                message: 'Weight must be a number',
              },
            }}
            name='weight'
          />
          {errors.weight && (
            <span className='text-red-500 translate-y-[-15px]'>{errors.weight.message}</span>
          )}
        </div>
        <CustomLoadingButton loading={loading} text='Add person' />
      </form>
    </section>
  );
};

export default AddPersonForm;
