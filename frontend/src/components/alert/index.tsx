import { InformationCircleIcon } from '@heroicons/react/20/solid'

type AlertStatus = 'blue' | 'orange' | 'red' | 'green'

interface IAlertProps {
  header?: string
  message: string
  status?: AlertStatus
  className?: string
}

/**
 * Renders an alert component with customizable header, message, and status.
 *
 * @param {Object} props - The props for the Alert component.
 * @param {string} props.header - The header text for the alert.
 * @param {string} props.message - The message text for the alert.
 * @param {string} [props.status='blue'] - The status of the alert. Possible values are 'blue', 'orange', 'red', and 'green'.
 * @param {string} [props.className] - Additional CSS classes to apply to the alert.
 * @returns {JSX.Element} The rendered Alert component.
 */
export const Alert = ({
  header,
  message,
  status = 'blue',
  className,
}: IAlertProps): JSX.Element => {
  const colorClasses = {
    blue: {
      background: 'bg-primary-50 dark:bg-primary-800',
      border: 'border-primary-200 dark:border-primary-700',
      text: 'text-primary-900 dark:text-primary-50',
      icon: 'text-primary-900 dark:text-primary-50',
    },
    orange: {
      background: 'bg-secondary-100 dark:bg-secondary-800',
      border: 'border-secondary-200 dark:border-secondary-700',
      text: 'text-secondary-900 dark:text-primary-50',
      icon: 'text-secondary-900 dark:text-primary-50',
    },
    red: {
      background: 'bg-error-200 dark:bg-error-800',
      border: 'border-error-300 dark:border-error-700',
      text: 'text-error-900 dark:text-error-50',
      icon: 'text-error-900 dark:text-error-50',
    },
    green: {
      background: 'bg-success-200 dark:bg-success-800',
      border: 'border-success-300 dark:border-success-700',
      text: 'text-success-900 dark:text-success-50',
      icon: 'text-success-900 dark:text-success-50',
    },
  }

  const { background, border, text, icon } = colorClasses[status]

  return (
    <div
      className={`${background} ${border} rounded-b border-t-4 ${text} px-4 py-3 shadow-md ${className}`}
      role='alert'
    >
      <div className='flex items-center'>
        <div className='py-1'>
          <InformationCircleIcon
            className={`fill-current h-8 w-8 ${icon} mr-2`}
          />
        </div>
        <div>
          {header && <p className='font-bold'>{header}</p>}
          <p className='text-sm'>{message}</p>
        </div>
      </div>
    </div>
  )
}
