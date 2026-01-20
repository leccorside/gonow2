import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerClassName = '',
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 border rounded-lg
          text-[var(--color-text)] bg-white
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
          ${error ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-[var(--color-error)]">{error}</p>
      )}
    </div>
  );
};
