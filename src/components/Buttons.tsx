import React from "react";
import classNames from "../util/classnames";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  additionalClassNames?: string;
  children: React.ReactNode;
};

export const BaseButton = React.memo(
  ({ size, children, additionalClassNames, ...rest }: ButtonProps) => (
    <button
      className={classNames(
        additionalClassNames,
        'inline-flex items-center border border-solid font-medium rounded shadow-sm focus:outline-none',
        size === 'xs' && 'px-2.5 py-1.5 text-xs',
        size === 'sm' && 'px-3 py-2 text-sm leading-4',
        (!size || size === 'md') && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-4 py-2 text-base',
        size === 'xl' && 'px-6 py-3 text-base'
      )}
      {...rest}
    >
      {children}
    </button>
  )
);

export const PrimaryButton = React.memo(
  ({ children, additionalClassNames, ...rest }: ButtonProps) => {
    return (
      <BaseButton
        additionalClassNames={classNames(
          additionalClassNames,
          'border-transparent text-white dark:text-gray-900 bg-indigo-600 dark:bg-indigo-400 hover:bg-indigo-700 dark:hover:bg-indigo-500'
        )}
        {...rest}
      >
        {children}
      </BaseButton>
    );
  }
);