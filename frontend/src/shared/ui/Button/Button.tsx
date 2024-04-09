import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

type VariantTypes = 'clear' | 'primary' | 'gradient' | 'gray' | 'outlined';

const variantClasses: Record<VariantTypes, string> = {
  clear: '',
  primary:
    'bg-main py-2 px-4 text-main-dark rounded-lg hover:bg-secondary-yellow disabled:bg-disabled duration-200',
  gray: '',
  gradient: 'bg-gradient-to-r from-[#F8DA2C] to-[#F16644] rounded-lg text-main-white',
  outlined:
    'outfit border-main border-[1px] px-4 py-[7px] rounded-lg font-normal text-[16px] text-main-dark duration-300 hover:border-main-white hover:text-white active:border-secondary active:text-secondary disabled:opacity-40',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  onClick?: () => void;
  variant: VariantTypes;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { children, onClick, variant, className, ...otherProps } = props;

  return (
    <button
      ref={ref}
      onClick={onClick}
      {...otherProps}
      type="button"
      className={`text-center ${variantClasses[variant]} ${className} `}
    >
      {children}
    </button>
  );
});

export default Button;
