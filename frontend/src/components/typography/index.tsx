import { ReactNode } from 'react'

export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'small'
  | 'bodySmall'
  | 'bodyLarge'
  | 'ingress'
  | 'largeBold'

export const styles: Record<Variant, string> = {
  h1: 'text-5xl font-bold relative text-primary dark:text-secondary',
  h2: 'text-[2.5rem] font-semibold text-primary dark:text-secondary',
  h3: 'text-[2rem] font-semibold text-primary dark:text-secondary',
  h4: 'text-2xl font-semibold text-primary dark:text-secondary',
  h5: 'text-lg font-bold text-primary dark:text-secondary',
  h6: 'text-base font-bold text-primary dark:text-secondary',
  small: 'text-sm text-black dark:text-secondary-50',
  bodySmall: 'text-base text-black dark:text-secondary-50',
  largeBold: 'text-xl text-black font-semibold dark:text-secondary-50',
  bodyLarge: 'text-lg text-black dark:text-secondary-50',
  p: 'text-lg text-black dark:text-secondary-50 ',
  ingress: 'text-2xl font-semibold text-primary dark:text-secondary-50',
}

interface ITypographyProps {
  variant?: Variant
  children: ReactNode
  className?: string
  title?: string
}

export const Typography = ({
  variant = 'p',
  children,
  className = '',
  title = '',
}: ITypographyProps): JSX.Element => {
  let style: string = ''

  switch (variant) {
    case 'h1':
      style = styles.h1
      break
    case 'h2':
      style = styles.h2
      break
    case 'h3':
      style = styles.h3
      break
    case 'h4':
      style = styles.h4
      break
    case 'h5':
      style = styles.h5
      break
    case 'h6':
      style = styles.h6
      break
    case 'small':
      style = styles.small
      break
    case 'bodySmall':
      style = styles.bodySmall
      break
    case 'largeBold':
      style = styles.largeBold
      break
    case 'bodyLarge':
      style = styles.bodyLarge
      break
    case 'ingress':
      style = styles.ingress
      break
    default:
      style = styles.p
      break
  }

  style = className ? style + ' ' + className : style

  const Element: Variant =
    variant === 'p' ||
    variant === 'small' ||
    variant === 'bodySmall' ||
    variant === 'bodyLarge' ||
    variant === 'largeBold' ||
    variant === 'ingress'
      ? 'p'
      : variant

  return (
    <Element className={style} title={title}>
      {children}
    </Element>
  )
}
