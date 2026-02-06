import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

type CommonProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>
type ButtonLinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

function styles(variant: ButtonVariant, size: ButtonSize) {
  return cn(
    'ui-button',
    `ui-button-${variant}`,
    `ui-button-${size}`,
  )
}

export function Button({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(styles(variant, size), className)} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn(styles(variant, size), className)} {...props}>
      {children}
    </a>
  )
}
