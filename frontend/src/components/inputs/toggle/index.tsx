import { Switch } from '@headlessui/react'

interface IToggleProps {
  isChecked: boolean
  handleToggle: () => void
  labels?: [string, string]
  classNames?: string
}

/**
 * Renders a toggle switch component.
 *
 * @component
 * @param {IToggleProps} props - The component props.
 * @param {boolean} props.isChecked - Indicates whether the toggle switch is checked or not.
 * @param {Function} props.handleToggle - The function to handle the toggle switch change event.
 * @param {string[]} [props.labels=['Yes', 'No']] - The labels to display for the toggle switch states.
 * @param {string} [props.classNames] - The class names to apply to the toggle switch container.
 * @returns {JSX.Element} The rendered toggle switch component.
 */
export const Toggle = ({
  isChecked,
  handleToggle,
  labels = ['Yes', 'No'],
  classNames,
}: IToggleProps): JSX.Element => {
  const [uncheckedLabel, checkedLabel] = labels
  return (
    <Switch.Group>
      <div className={classNames}>
        <Switch.Label className='mr-4'>
          {isChecked ? `${uncheckedLabel}` : `${checkedLabel}`}
        </Switch.Label>

        <Switch
          checked={isChecked}
          onChange={() => {
            handleToggle()
          }}
          className={`${
            isChecked
              ? 'border-primary bg-primary'
              : 'border-primary/20 bg-primary/15'
          } relative inline-flex h-6 w-11 items-center rounded-full border outline-none focus:ring focus:ring-seconday-cloak focus:ring-offset-2`}
        >
          <span
            className={`${
              isChecked
                ? 'translate-x-6 bg-primary-off-white'
                : 'translate-x-1 bg-primary/20'
            } inline-block h-4 w-4 transform rounded-full transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}
