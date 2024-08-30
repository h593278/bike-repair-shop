import { useState } from "react"
import { AddCustomer, getCustomerByEmail } from "../Api"
import { Button } from "../components/buttons/button"
import { Input } from "../components/inputs/input"
import { Customer } from "../types/Customer"
import { StateMachine } from "../types/StateMachine"

interface IUserInformationPageProps {
  email: string
  setCustomer: (customer: Customer) => void
  setState: (state: StateMachine) => void
}

export const UserInformationPage = ({
  email,
  setCustomer,
  setState,
}: IUserInformationPageProps): JSX.Element => {
  const [name, setName] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")

  const newUser = async () => {  
    //Check parameter value
    if (name == "" || phoneNumber == "") {
      return
    }

    const customer: Customer = {
      id: 0,
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      orders: []
    }
    
    //Try to add customer
    const addCustomerResponse = await AddCustomer(customer)
    if (addCustomerResponse.status != 201) {
      return
    }

    //Retrieve the new customer
    const newCustomerResponse: Response = await getCustomerByEmail(email)
    if (newCustomerResponse.status === 200) {
      setCustomer(await newCustomerResponse.json())
      setState(StateMachine.BikeInformationPage)
    }
  }


  return (
     <div className='flex gap-4 flex-col'>
      <Input 
        id='name' 
        onChange={(event) => setName(event.target.value)} 
        placeholder='ola nordman' 
        value={name}
        label='Name'
        />
      <Input 
        id='phoneNumber' 
        onChange={(event) => setPhoneNumber(event.target.value)} 
        placeholder='+4712345678' 
        value={phoneNumber}
        label='Phone Number'
        type="tel"
        />
      <Button onClick={() => setState(StateMachine.HomePage)} label='Back'/>
      <Button onClick={newUser} label='Next'/>
   </div>
  )
}
