import React, { FC, Fragment, useState } from 'react';

import { Listbox, Switch, Transition } from '@headlessui/react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PhoneInput } from 'react-international-phone';

import { Seller } from '@/enteties/Seller/model/types/seller';
import arrow from '@/shared/assets/icons/arrow-right.svg?react';
import checked from '@/shared/assets/icons/checked-thin.svg?react';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

const GeneralBlockSellerForm: FC = () => {
  const { t } = useTranslation();

  const [quantity, setQuantity] = useState<number>(0);

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Seller>();

  const {
    fields: generalCommunFields,
    remove: removeGeneralMethods,
    append: appendGeneralMethods,
  } = useFieldArray({
    control,
    name: `generalCommunication`,
  });

  const messengersList: string[] = ['Telegram', 'Viber', 'WhatsUp'];

  const appendGenMethods = () => {
    appendGeneralMethods({ messenger: '', phone: '' });
  };

  const removeGenMethods = (indexToRemove: number) => {
    removeGeneralMethods(indexToRemove);
  };

  const renderCommunicationMethods = () => (
    <HStack gap="5" className="w-full">
      <Text
        Tag="p"
        text={t("Контакти для зв'язку з клієнтами")}
        size="xl"
        className="leading-[26px] text-selected-dark"
      />
      <div className="w-full">
        {generalCommunFields.map((field, index) => (
          <HStack key={field.id} gap="4" className="w-full">
            <HStack align="start" gap="5" className="w-full sm:flex-row">
              {/* MESSENGER LIST */}
              <div className="relative w-full">
                <Controller
                  name={`generalCommunication.${index}.messenger`}
                  control={control}
                  defaultValue=""
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Listbox value={field.value} onChange={field.onChange}>
                      {({ open }) => (
                        <>
                          <Listbox.Button className="relative w-full rounded-t-lg border-b-[1px] border-gray-900 bg-transparent px-4 py-3">
                            <VStack align="center" gap="4">
                              <Text
                                className={
                                  field.value === ''
                                    ? '!text-disabled'
                                    : 'text-selected-dark'
                                }
                                Tag="p"
                                text={
                                  field.value === '' ? t('Обрати зі списку') : field.value
                                }
                                size="sm"
                              />
                              <Icon
                                Svg={arrow}
                                className={`ml-auto fill-selected-dark ${open ? '-rotate-90' : 'rotate-90'}`}
                                width={24}
                                height={24}
                              />
                            </VStack>
                          </Listbox.Button>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-in duration-100"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                          >
                            <Listbox.Options
                              className="absolute h-auto w-full overflow-auto rounded-b-lg border-x-[1px] border-b-[1px] border-gray-900 bg-main-white z-40"
                              static
                            >
                              {messengersList.map((value, index) => (
                                <Listbox.Option
                                  key={index}
                                  value={value}
                                  className="relative flex px-4 py-3 outfit text-[14px] text-disabled font-normal leading-[24px] cursor-pointer hover:text-selected-dark hover:bg-disabled focus:text-selected-dark focus:bg-disabled"
                                >
                                  {value}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </>
                      )}
                    </Listbox>
                  )}
                />
              </div>

              {/* PHONE NUMBER */}
              <HStack gap="1" className="w-full">
                <Controller
                  name={`generalCommunication.${index}.phone`}
                  control={control}
                  rules={{
                    required: t("Це поле є обов'язковим"),
                    minLength: {
                      value: 13,
                      message: t('Введіть правильний номер'),
                    },
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      defaultCountry="ua"
                      disableDialCodePrefill
                      defaultMask=".........."
                      placeholder={t('Номер телефону')}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      className="border-b-[1px] border-gray-900 w-full"
                      inputClassName="!outfit !min-h-[48px] !min-w-[100px] !pl-4 !bg-transparent !placeholder:text-disabled !text-[16px] !text-main-dark !font-normal !border-none !focus:text-main-dark !outline-none"
                      countrySelectorStyleProps={{
                        className: '!hidden',
                        buttonClassName: '!bg-transparent !min-h-[48px] !border-none',
                      }}
                    />
                  )}
                />
                {errors?.generalCommunication?.[index]?.phone && (
                  <p className="outfit font-normal text-[12px] text-error-red">
                    {errors?.generalCommunication?.[index]?.phone?.message}
                  </p>
                )}
              </HStack>
            </HStack>
            <VStack align="center" justify="between" className="w-full">
              <Button
                disabled={generalCommunFields.length === 3}
                variant="clear"
                className="outfit text-blue text-[14px] leading-[18px] font-semibold border-b-blue border-b-[1px] disabled:text-disabled disabled:border-b-disabled"
                onClick={appendGenMethods}
              >
                {t('Додати')}
              </Button>
              <Button
                disabled={generalCommunFields.length === 1}
                variant="clear"
                className="outfit text-selected-dark text-[14px] leading-[18px] font-semibold border-b-selected-dark border-b-[1px] disabled:text-disabled disabled:border-b-disabled"
                onClick={() => removeGenMethods(index)}
              >
                {t('Видалити')}
              </Button>
            </VStack>
          </HStack>
        ))}
      </div>
    </HStack>
  );

  const renderNotification = () => (
    <HStack gap="5" className="w-full">
      <Text
        Tag="p"
        text={t('Налаштування e-mail сповіщень')}
        size="xl"
        className="leading-[26px] text-selected-dark"
      />
      {/* SWITCH NOTIFICATIONS */}
      <Controller
        name="emailAdvice"
        control={control}
        defaultValue
        rules={{ required: false }}
        render={({ field }) => (
          <VStack align="center" className="gap-[14px]">
            <Switch
              checked={field.value}
              onChange={field.onChange}
              className={`${
                field.value ? 'bg-secondary-yellow' : 'bg-light-grey'
              } relative inline-flex h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
            >
              <span
                aria-hidden="true"
                className={`${
                  field.value ? 'translate-x-[14px]' : 'translate-x-0'
                } pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            <Text
              Tag="span"
              text={t(
                'Корисні поради, рекомендації, оновлення на сайті для покращення і комфортної роботи.',
              )}
              size="md"
              className="text-selected-dark"
            />
          </VStack>
        )}
      />
      <Controller
        name="emailAdvertisement"
        control={control}
        defaultValue={false}
        rules={{ required: false }}
        render={({ field }) => (
          <VStack align="center" className="gap-[14px]">
            <Switch
              checked={field.value}
              onChange={field.onChange}
              className={`${
                field.value ? 'bg-secondary-yellow' : 'bg-light-grey'
              } relative inline-flex h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
            >
              <span
                aria-hidden="true"
                className={`${
                  field.value ? 'translate-x-[14px]' : 'translate-x-0'
                } pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            <Text
              Tag="span"
              text={t('Додавання оголошень до обраних та нові відгуки на оголошення.')}
              size="md"
              className="text-selected-dark"
            />
          </VStack>
        )}
      />
      <Controller
        name="emailMessage"
        control={control}
        defaultValue={false}
        rules={{ required: false }}
        render={({ field }) => (
          <VStack align="center" className="gap-[14px]">
            <Switch
              checked={field.value}
              onChange={field.onChange}
              className={`${
                field.value ? 'bg-secondary-yellow' : 'bg-light-grey'
              } relative inline-flex h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
            >
              <span
                aria-hidden="true"
                className={`${
                  field.value ? 'translate-x-[14px]' : 'translate-x-0'
                } pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            <Text
              Tag="span"
              text={t('Нові повідомлення та відгуки на продукт.')}
              size="md"
              className="text-selected-dark"
            />
          </VStack>
        )}
      />

      {/* USER AGREEMENT */}
      <VStack align="center" className="gap-3">
        <Checkbox
          type="checkbox"
          classNameLabel="text-selected-dark text-[14px] leading-[18px]"
          className="min-w-6 border-2 border-disabled rounded-[3px] hover:border-dark-grey checked:border-dark-grey checked:hover:border-dark-grey focus:outline-none"
          classNameIcon="w-4 ml-1"
          icon={checked}
          {...register('conditions', {
            required: true,
          })}
        />
        <div>
          <span className="text-selected-dark text-[14px] leading-[18px]">
            {t('Реєструючись, ви погоджуєтеся з умовами')}
          </span>
          <a
            href="src/shared/assets/img/Error404vector.png" // test file, later to change to real document.
            download="Processing-regulations"
            className="outfit font-normal text-[14px] text-blue underline mx-1"
          >
            {t('Положення про обробку і захист персональних даних')}
          </a>
          <span className="text-selected-dark text-[14px] leading-[18px]">{t('та')}</span>
          <a
            href="src/shared/assets/img/Error404vector.png" // test file, later to change to real document.
            download="User-agreement"
            className="outfit font-normal text-[14px] text-blue underline mx-1"
          >
            {t('Угодою користувача')}
          </a>
        </div>
      </VStack>
    </HStack>
  );

  return (
    <HStack justify="start" className="w-full gap-9">
      <Text
        Tag="p"
        text={t('Інформація про компанію, доступна на сайті для всіх користувачів')}
        bold
        size="2xl"
        className="leading-[30px] text-selected-dark"
      />

      <HStack gap="5" className="w-full">
        <Text
          Tag="p"
          text={t('Назва компанії')}
          size="xl"
          className="leading-[26px] text-selected-dark"
        />
        <div className="w-full">
          <Input
            variant="basic"
            placeholder={t('Введіть назву компанії')}
            type="text"
            autoComplete="off"
            className="min-h-[48px] w-full"
            classNameBlockWrap="w-full mb-2"
            {...register('generalName', {
              required: t("Це поле є обов'язковим"),
              pattern: {
                value: /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ\s".'-]*$/,
                message: t('Введіть назву українською мовою'),
              },
              onChange: (e) => {
                setQuantity(e.target.value.length);
              },
            })}
            maxLength={100}
            error={errors?.generalName && errors?.generalName.message}
          />
          <VStack align="center" justify="between" className="w-full">
            <Text
              Tag="p"
              text={t('Введіть не більше 100 символів')}
              size="xs"
              className="!text-selected-dark"
            />
            <Text
              Tag="p"
              text={`${quantity}/100`}
              size="xs"
              className="!text-selected-dark"
            />
          </VStack>
        </div>
      </HStack>

      {renderCommunicationMethods()}
      {renderNotification()}
    </HStack>
  );
};

export default GeneralBlockSellerForm;
