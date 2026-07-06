import { Warning } from '@phosphor-icons/react'
import { ComponentProps, forwardRef } from 'react'
import { tv } from 'tailwind-variants'

const inputBoxVariants = tv({
  base: 'w-full rounded-lg border border-gray-300 px-3 py-2.5 text-md text-gray-600 placeholder:text-gray-400 focus-within:border-blue-base',
  variants: {
    error: {
      true: 'border-danger',
    },
  },
})

type InputProps = ComponentProps<'input'> & {
  label: string
  error?: boolean
  errorMessage?: string
  prefix?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, errorMessage, prefix, className, id, ...props }, ref) => {
    const inputId = id ?? props.name

    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={inputId}
          className="text-xs font-semibold uppercase text-gray-500"
        >
          {label}
        </label>

        {prefix ? (
          <div className={inputBoxVariants({ error, className: 'flex items-center gap-1' })}>
            <span className="select-none text-gray-400">{prefix}</span>
            <input
              id={inputId}
              ref={ref}
              className="w-full border-none bg-transparent p-0 text-md text-gray-600 placeholder:text-gray-400 focus:outline-none"
              {...props}
            />
          </div>
        ) : (
          <input
            id={inputId}
            ref={ref}
            className={inputBoxVariants({
              error,
              className: 'focus:outline-none focus:border-blue-base',
            })}
            {...props}
          />
        )}

        {error && errorMessage ? (
          <p className="flex items-center gap-1 text-sm text-danger">
            <Warning />
            {errorMessage}
          </p>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'
