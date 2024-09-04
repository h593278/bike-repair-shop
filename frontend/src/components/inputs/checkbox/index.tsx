import { CheckIcon } from '@heroicons/react/20/solid'
import { ChangeEvent } from 'react'

interface ICheckboxProps {
  id: string
  label: string
  isChecked: boolean
  showLabel?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  wrapperClassName?: string
  disabled?: boolean
}

/**
 * Checkbox component.
 *
 * @component
 * @param {ICheckboxProps} props - The component props.
 * @param {string} props.id - The id of the checkbox.
 * @param {string} props.label - The label of the checkbox.
 * @param {boolean} props.isChecked - The checked state of the checkbox.
 * @param {boolean} [props.showLabel=true] - Determines if the label should be displayed.
 * @param {boolean} [props.disabled=false] - Determines if the checkbox should be disabled.
 * @param {string} [props.wrapperClassName] - Additional CSS classes for the checkbox wrapper.
 * @param {function} props.onChange - The callback function to be called when the checkbox state changes.
 * @returns {JSX.Element} The checkbox component.
 *
 */

export const Checkbox = ({
  id,
  label,
  isChecked,
  showLabel = true,
  disabled = false,
  wrapperClassName,
  onChange,
}: ICheckboxProps): JSX.Element => {
  return (
    <div className={`inline-flex items-end ${wrapperClassName}`}>
      <label
        className='relative flex cursor-pointer items-center rounded'
        htmlFor={id}
      >
        <input
          type='checkbox'
          className='peer relative h-4 w-4 cursor-pointer appearance-none rounded border border-primary
                    transition-all checked:border-primary 
                    checked:bg-primary focus:ring-2 
                    focus:ring-primary-500 focus:ring-offset-2 
                    dark:border-neutral-700 dark:checked:border-primary-500 dark:checked:bg-primary-700 dark:focus:ring-primary-600'
          id={id}
          name={id}
          disabled={disabled}
          checked={isChecked}
          onChange={onChange}
          aria-labelledby={`${id}-label`}
        />
        <span
          className='pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 opacity-0 transition-opacity
                         peer-checked:text-primary-50 peer-checked:opacity-100 dark:peer-checked:text-neutral-50'
        >
          <CheckIcon className='h-3 w-3 stroke-2' />
        </span>
      </label>
      {showLabel && (
        <label
          className='ml-2 cursor-pointer select-none text-sm font-medium
                     text-primary dark:text-neutral-200'
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  )
}
