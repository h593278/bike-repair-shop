import { ChangeEvent, useRef } from 'react'

interface IInputProps {
  id: string
  label: string
  type?: 'email' | 'password' | 'text' | 'number' | 'tel' | 'url' | 'search'
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
  value?: string | number
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
  id,
  label,
  type = 'text',
  placeholder,
  required = true,
  disabled = false,
  className = '',
  value = '',
  onChange,
}: IInputProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null)

  const setFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  let stylingInput =
    type === 'search'
      ? 'bg-transparent focus:outline-none p-0 border-0 w-full '
      : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-lg border p-2.5 '
  stylingInput += className

  return (
    <div
      className={
        'relative mb-5' +
        (disabled
          ? ''
          : type === 'search'
            ? ' cursor-text hover:scale-110'
            : ' cursor-text')
      }
      onClick={setFocus}
    >
      <div className={type === 'search' ? 'mb-0.5 pl-2' : ''}>
        <div className={type === 'search' ? 'w-10/12' : '' + ' text-left'}>
          <label htmlFor={id} className=' text-gray-900 font-medium'>
            {label}
          </label>
          <input
            type={type}
            id={id}
            className={stylingInput}
            value={value}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            onChange={onChange}
            ref={inputRef}
          />
        </div>
        {type === 'search' && (
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            {/* Search Icon */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6 hover:h-7 hover:w-7'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
          </span>
        )}
      </div>
      {type === 'search' && (
        <div className='bg-gray-50 border-gray-300 mt-0 border-b'></div>
      )}
    </div>
  )
}