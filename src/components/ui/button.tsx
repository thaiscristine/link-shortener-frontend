import { Slot } from '@radix-ui/react-slot'
import { CircleNotch } from '@phosphor-icons/react'
import { ComponentProps, forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center gap-2 text-md transition-colors disabled:pointer-events-none',

  variants: {
    variant: {
      primary:
        'w-full rounded-lg bg-blue-base px-4 py-2.5 font-semibold text-gray-white hover:bg-blue-dark disabled:bg-blue-muted',
      secondary:
        'rounded-md border border-gray-300 bg-transparent px-3 py-2 text-gray-500 hover:bg-gray-100 disabled:border-gray-300 disabled:text-gray-300',
      icon: 'rounded-md border border-gray-300 p-1.5 text-gray-400 hover:bg-gray-100',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, className, asChild, isLoading, disabled, children, ...props },
    ref,
  ) => {
    const Component = asChild ? Slot : 'button'

    return (
      <Component
        ref={ref}
        className={buttonVariants({ variant, className })}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <CircleNotch className="animate-spin" /> : children}
      </Component>
    )
  },
)

Button.displayName = 'Button'
