import { useState } from "react"
import { Button } from "../components/buttons/button"
import { Input } from "../components/inputs/input"
import { Customer } from "../types/Customer"
import { StateMachine } from "../types/StateMachine"
import { ServiceType } from "../types/ServiceType"
import { Order } from "../types/Order"

interface IBikeInformationPageProps {
  customer: Customer | null
  setCustomer: (customer: Customer | null) => void
  setState: (state: StateMachine) => void
}

export const BikeInformationPage = ({
  customer,
  setCustomer,
  setState,
}: IBikeInformationPageProps): JSX.Element => {
  const [bikeBrand, setBikeBrand] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [serviceType, setServiceType] = useState<ServiceType>(ServiceType.BrakeMaintenance)

  const newOrder = async () => {  
    //Check parameter value
    if (bikeBrand == "") {
      return
    }

    if(!customer) {
      setState(StateMachine.HomePage)
      return
    }

    const order: Order = {
      id: 0,
      customerId: customer.id,
      expectedDueDate: "",
      serviceType: serviceType,
      bikeBrand: bikeBrand,
      note: notes,
    }
    
    // //Try to add customer
    // const addCustomerResponse = await AddCustomer(customer)
    // if (addCustomerResponse.status != 201) {
    //   return
    // }

    // //Retrieve the new customer
    // const newCustomerResponse: Response = await getCustomerByEmail(email)
    // if (newCustomerResponse.status === 200) {
    //   setCustomer(await newCustomerResponse.json())
    //   setState(StateMachine.BikeInformationPage)
    // }
  }


  return (
     <div className='flex gap-4 flex-col'>
      <Input 
        id='bikeBrand' 
        onChange={(event) => setBikeBrand(event.target.value)} 
        placeholder='Orbea' 
        value={bikeBrand}
        label='Bike Brand'
        />
      <Input 
        id='notes' 
        onChange={(event) => setNotes(event.target.value)} 
        placeholder='...' 
        value={notes}
        label='Notes'
        />
      <Button onClick={() => setState(StateMachine.CustomerInformationPage)} label='Back'/>
      <Button onClick={newOrder} label='Send Request'/>
   </div>
  )
}
