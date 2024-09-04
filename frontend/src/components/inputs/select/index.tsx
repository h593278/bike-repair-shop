import { Field, Label, Select } from '@headlessui/react'
import { ChangeEventHandler, FC } from 'react'

interface ISelectInputProps {
  items: Array<{ value: string; label: string }>
  selectedValue: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  className?: string
  width?: string
  withBottomBorder?: boolean
  label?: string
}

export const SelectInput: FC<ISelectInputProps> = ({
  items,
  selectedValue,
  onChange,
  className,
  width = 'w-20',
  withBottomBorder = false,
  label,
}) => {
  return (
    <div className={`${width} ${className}`}>
      <Field>
        <Label className={'relative z-10 text-sm'}>{label}</Label>
        <Select
          defaultValue={selectedValue}
          onChange={onChange}
          className={`relative w-full cursor-default py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary-600 focus-visible:ring-2 focus-visible:ring-secondary-50 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-500 sm:text-sm
            ${withBottomBorder ? 'border-gray-300 border-b-2' : 'rounded-lg'}
            ${selectedValue ? 'bg-secondary-50 dark:bg-primary dark:text-secondary-50' : 'bg-white dark:bg-gray-800'}`}
        >
          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </Field>
    </div>
  )
}
