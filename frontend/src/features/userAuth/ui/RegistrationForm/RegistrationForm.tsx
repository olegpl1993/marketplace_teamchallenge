import React, { FC, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import privateEye from '@/shared/assets/icons/private-eye.svg?react';
import unPrivateEye from '@/shared/assets/icons/unprivate-eye.svg?react';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { Link } from '@/shared/ui/Link';
import { VStack } from '@/shared/ui/Stack';

interface Props {}

interface InputsValues {
  inputName: string;
  inputEmail: string;
  inputPhone: string;
  inputPassword: string;
  personalTerms: string;
}

const RegistrationForm: FC<Props> = () => {
  const [passShown, setPassShown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setFocus,
  } = useForm<InputsValues>({
    mode: 'onBlur',
  });

  useEffect(() => {
    setFocus('inputName');
  }, [setFocus]);

  const onSubmit: SubmitHandler<InputsValues> = () => {
    reset();
  };

  const onTogglePassVisibility = () => {
    setPassShown(!passShown);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        variant="basic"
        placeholder="Name"
        type="text"
        {...register('inputName', {
          required: 'This field is required',
          minLength: { value: 3, message: 'Your name must be min 3 symbols' },
          maxLength: { value: 15, message: 'Your name must be max 15 symbols' },
        })}
        error={errors?.inputName && errors?.inputName.message}
        className="mt-6"
      />
      <Input
        variant="basic"
        placeholder="Email"
        type="text"
        {...register('inputEmail', {
          required: 'This field is required',
          minLength: { value: 5, message: 'Your login must be min 6 symbols' },
          pattern: {
            value:
              /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
            message: 'Your login must be xxxx@xxx.xx templates',
          },
        })}
        error={errors?.inputEmail && errors?.inputEmail.message}
        className="mt-10"
      />
      <div className="relative mt-10 mb-10">
        <Input
          variant="basic"
          placeholder="Password"
          type={passShown ? 'text' : 'password'}
          {...register('inputPassword', {
            required: 'This field is required',
            minLength: { value: 5, message: 'Your login must be min 6 symbols' },
          })}
          error={errors?.inputPassword && errors?.inputPassword.message}
        />
        <Icon
          clickable
          onClick={onTogglePassVisibility}
          Svg={passShown ? privateEye : unPrivateEye}
          width={24}
          height={24}
          className="absolute top-[12px] right-[12px]"
        />
      </div>
      <div>RECAPCHA</div>
      <Checkbox
        type="checkbox"
        variant="basic"
        label="Personal data termins"
        {...register('personalTerms', {
          required: true,
        })}
      />
      <Input
        variant="clear"
        value="Sign up"
        name="btnInput"
        type="submit"
        disabled={!isValid}
        className="outfit bg-primary min-w-full py-[4px] mt-6 rounded-lg font-normal text-[18px] leading-[40px] text-black duration-300 hover:bg-secondary active:bg-primary disabled:text-white-300 disabled:bg-white-400"
      />
      <VStack align="center" className="mt-6" justify="between">
        <span className="outfit text-right text-gray-900 text-[14px] font-normal leading-[18px]">
          Already have an account?
        </span>
        <Link to="/">
          <span className="outfit text-right text-black text-[14px] font-semibold decoration-solid decoration-black underline decoration-1">
            Sign up
          </span>
        </Link>
      </VStack>
    </form>
  );
};

export default RegistrationForm;
