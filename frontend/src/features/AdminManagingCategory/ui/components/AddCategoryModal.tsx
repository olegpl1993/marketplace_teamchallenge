/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import { FC } from 'react';

import { $api } from '@/shared/api/api';
import close from '@/shared/assets/icons/cancel.svg?react';
import { ApiRoutes } from '@/shared/const/apiEndpoints';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { ModalWindow } from '@/shared/ui/ModalWindow';
import { Text } from '@/shared/ui/Text';

interface AddCategory {
  name: string;
  icon: File | null;
  parentCategory: string | undefined;
  type: 'category' | 'subcategory' | 'subsubcategory' | null;
}

interface Props {
  addCategory: AddCategory;
  setAddCategory: ({ name, icon, parentCategory, type }: AddCategory) => void;
  refetchCategoryData: () => void;
}

const AddCategoryModal: FC<Props> = (props) => {
  const { setAddCategory, addCategory, refetchCategoryData } = props;

  const closeAndClear = () => {
    setAddCategory({
      name: '',
      icon: null,
      parentCategory: undefined,
      type: null,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setAddCategory({ ...addCategory, icon: file });
    }
  };

  const sendNewCategory = async () => {
    const formData = new FormData();

    if (addCategory.name) formData.append('name', addCategory.name);
    if (addCategory.icon) formData.append('image', addCategory.icon);
    if (addCategory.parentCategory)
      formData.append('parentId', addCategory.parentCategory || '');
    formData.append('description', 'Test description');

    try {
      await $api.post(ApiRoutes.CATEGORY, formData);
    } catch (error) {
      console.error(error);
    } finally {
      closeAndClear();
      refetchCategoryData();
    }
  };

  const validateForm = () => {
    if (addCategory.type === 'category' && addCategory.name && addCategory.icon)
      return false;
    if (addCategory.type === 'subcategory' && addCategory.name) return false;
    if (addCategory.type === 'subsubcategory' && addCategory.name) return false;

    return true;
  };

  return (
    <ModalWindow
      className="flex flex-col gap-[10px] items-start !bg-selected-dark rounded-2xl max-w-[386px] w-full px-[50px] pt-[50px] pb-[20px] relative"
      onCloseFunc={closeAndClear}
    >
      <Icon
        Svg={close}
        width={24}
        height={24}
        className="fill-main-white self-end cursor-pointer absolute right-[12px] top-[12px]"
        onClick={closeAndClear}
      />

      {addCategory.type === 'category' && (
        <span className="text-white text-[18px] font-outfit">
          Додайте назву категорії
        </span>
      )}

      <div className="relative w-full">
        <input
          type="text"
          placeholder="Введіть назву"
          className="bg-main-dark w-full h-[44px] rounded-lg p-4 text-disabled text-[14px] font-outfit focus:outline-none"
          onChange={(event) =>
            setAddCategory({ ...addCategory, name: event.target.value })
          }
          value={addCategory.name}
          maxLength={16}
        />

        <span className="absolute right-[10px] top-[10px] text-disabled text-[14px] font-outfit">
          {addCategory.name.length}/16
        </span>
      </div>

      {addCategory.type === 'category' && (
        <div className="w-full flex flex-col gap-[5px]">
          <span className="text-white text-[18px] font-outfit">
            Завантажте іконку категорії
          </span>

          <span className="text-disabled text-[14px] font-outfit">
            Файли з форматів: png, jpg, svg
          </span>

          <div className="flex justify-start items-center w-full gap-[20px]">
            <label className="flex justify-center items-center cursor-pointer w-[108] border-[1px] border-disabled p-[10px]">
              <span className="text-disabled text-[16px] font-outfit">Обрати файл</span>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {addCategory.icon?.name ? (
              <span className="text-disabled text-[16px] font-outfit">
                {addCategory.icon.name}
              </span>
            ) : (
              <span className="text-disabled text-[16px] font-outfit">
                файл не вибрано
              </span>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        className="flex justify-center items-center rounded-lg h-[48px] mt-[15px] bg-main w-full"
        onClick={sendNewCategory}
        disabled={validateForm()}
      >
        <Text Tag="span" text="Додати" size="md" align="center" />
      </button>

      <div className="flex justify-center items-center w-full">
        <Button onClick={closeAndClear} className="text-sm" variant="border-bottom">
          Відмінити
        </Button>
      </div>
    </ModalWindow>
  );
};

export default AddCategoryModal;
