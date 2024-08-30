import { colorsButton } from '../button'
import { IconType } from '../../../types/iconType'

interface IIconButtonProps {
  onClick: () => void
  onDoubleClick?: () => void
  Icon: IconType
  className?: string
  styleType?: 'standard' | 'tab'
  size?: number
}

/**
 * Renders an icon button component.
 *
 * @param {IIconButtonProps} props - The component props.
 * @param {function} props.onClick - The callback function to be called when the button is clicked.
 * @param {function} props.onDoubleClick - The callback function to be called when the button is double clicked.
 * @param {IconType} props.Icon - The icon component to be displayed.
 * @param {string} [props.extraClasses] - The extra classes to be applied to the button (optional).
 * @returns {JSX.Element} The rendered icon button component.
 *
 * @returns The rendered icon button component.
 *
 * @example
 * <IconButton
 * handleOnClick={() => {}}
 * Icon={PlusIcon}
 * />
 */
export const IconButton = ({
  onClick,
  onDoubleClick,
  Icon,
  className,
  styleType = 'standard',
  size = 4,
}: IIconButtonProps): JSX.Element => {

  let typeClass: string = 'transition-all duration-300'
  switch (styleType) {
    case 'standard': {
      typeClass += ' rounded bg-primary px-2 py-2 text-sm font-medium text-secondary-50 focus:outline-none focus:ring-2 focus:ring-seconday-cloak dark:bg-primary-900 dark:text-primary-200 dark:hover:bg-primary-500 dark:hover:text-primary-50 hover:bg-primary-900 hover:text-primary-50 hover:bg-primary-500 hover:text-primary-200'
      break 
    }
    case 'tab': {
      typeClass += ` bg-secondary-50 dark:bg-primary-950 p-2 ${colorsButton.primary.text}`
      break
    }
    default: {
      break
    }
    
  }
  const combinedClasses = typeClass + "" + className
  return (
    <button 
      type={styleType == 'tab' ? 'button' : 'submit'} 
      className={combinedClasses} 
      onClick={onClick} 
      onDoubleClick={onDoubleClick}
      >
      <Icon className={`h-${size} w-${size}`} data-testid='search-icon' />
    </button>
  )
}
