import { Button } from "../components/buttons/button"
import { Input } from "../components/inputs/input"
import { Customer } from "../types/Customer"
import { StateMachine } from "../types/StateMachine"
import { getCustomerByEmail } from "../utils/Api"

interface IHomePageProps {
  email: string
  setEmail: (email: string) => void
  setCustomer: (customer: Customer) => void
  setState: (state: StateMachine) => void
}

export const HomePage = ({
  email,
  setEmail,
  setCustomer,
  setState,
}: IHomePageProps): JSX.Element => {

  const checkEmail = async () => {
    
    //check if If Customer/user Exist
    const customerResponse: Response = await getCustomerByEmail(email)
    if (customerResponse.status === 200) {
      setCustomer(await customerResponse.json())
      setState(StateMachine.CustomerPage)
    } else if (customerResponse.status === 404) {
      setState(StateMachine.NewCustomerPage)
    }
  }
  return (
     <div className='flex gap-4 flex-col'>
      <Input 
        id='email' 
        onChange={(event) => setEmail(event.target.value)} 
        placeholder='ola.nordman@gmail.com' 
        value={email}
        label='Email'
        />
      <Button onClick={checkEmail} label='Bike Repair'/>
   </div>
  )
}
