import { IconType } from "../../../types/iconType"

type ButtonVariant = 'filled' | 'outlined' | 'text' | 'delete'
type ButtonType = 'primary'

type colorsButtonType = {
  primary: {
    filled: string
    outlined: string
    text: string
    delete: string
  }
}

export const baseClassesButton =
    'flex-nowrap flex items-center justify-center px-2 py-1.5 font-bold tracking-wider focus:outline-none transition-all duration-300 rounded focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-off-white focus:ring-seconday-cloak'

export const colorsButton: colorsButtonType = {
  primary: {
    filled:
      'bg-primary text-primary-50 border-primary hover:bg-primary-900 hover:border border hover:text-primary hover:text-secondary dark:bg-primary-900 dark:hover:bg-primary-500 dark:text-primary-200',
    outlined:
      'text-primary border border-primary hover:bg-primary bg-secondary-50 hover:text-primary-50 dark:text-primary-200 dark:border-primary-200 dark:hover:border-primary-50 dark:hover:bg-primary-900 dark:bg-primary',
    text: 'text-primary hover:bg-neutral-100 dark:text-primary-300 dark:hover:bg-primary-700',
    delete: 'bg-error-700 hover:bg-error-400 active:bg-error-900 text-secondary-50 dark:bg-error-700 dark:hover:bg-error-500 dark:active:bg-error-900 dark:text-secondary-50'
  },
}

interface IButtonProps {
  label?: string
  onClick: () => void
  variant?: ButtonVariant
  type?: ButtonType
  Icon?: IconType
  loading?: boolean
  className?: string
}

/**
 * @component
 * @param {IButtonProps} props - The component props.
 * @param {string} props.label - The button label.
 * @param {function} props.onClick - The callback function to be called when the button is clicked.
 * @param {ButtonVariant} [props.variant='filled'] - The button variant type default to 'filled' (optional)
 * @param {ButtonType} [props.type='primary'] - The button type default to 'primary' (optional)
 * @param {IconType} [props.Icon] - The optional icon component to be displayed (optional)
 * @param {className} [props.className] - classes to add to the button
 * @returns {JSX.Element} The button component.
 *
 * @todo Add more button types and variants.
 *
 * @example
 * <Button
 *  label='Expand All'
 * onClick={() => chart?.expandAll()}
 * Icon={ChevronDoubleDownIcon}
 * />
 */

export const Button = ({
  label,
  onClick,
  variant = 'filled',
  type = 'primary',
  loading = false,
  Icon,
  className = '',
}: IButtonProps): JSX.Element => {

  const variantClasses = colorsButton[type][variant]

  return (
    <button 
      onClick={onClick} 
      className={`${baseClassesButton} ${variantClasses} ${className}`} 
    >
      {Icon && (
        <Icon
          className={`h-5 w-5 ${loading && `animate-spin`} ${label && 'mr-2'}`}
          data-testid='icon'
        />
      )}
      {label}
    </button>
  )
}
