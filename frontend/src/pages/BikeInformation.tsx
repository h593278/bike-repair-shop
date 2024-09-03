import { useState } from "react"
import { Button } from "../components/buttons/button"
import { Input } from "../components/inputs/input"
import { Customer } from "../types/Customer"
import { StateMachine } from "../types/StateMachine"
import { ServiceType } from "../types/ServiceType"
import { Order } from "../types/Order"
import { SelectInput } from "../components/inputs/select"
import { AddOrder, getCustomer } from "../utils/Api"

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

  const generateExpectedDueDate = (): string => {
    const currentDate = new Date();

    // Step 2: Add three days to the current date
    currentDate.setDate(currentDate.getDate() + 3);

    // Step 3: Format the new date (yyyy-MM-dd)
    return currentDate.toISOString().split("T")[0]
  }

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
      expectedDueDate: generateExpectedDueDate(),
      serviceType: serviceType,
      bikeBrand: bikeBrand,
      note: notes,
    }
    
    //Try to add customer
    const addCustomerResponse = await AddOrder(order)
    if (addCustomerResponse.status != 201) {
      return
    }

    //Retrieve new customer with the new Order
    const newCustomerResponse: Response = await getCustomer(customer.id)
    if (newCustomerResponse.status === 200) {
      setCustomer(await newCustomerResponse.json())
      setState(StateMachine.ReceiptPage)
    }
  }

  const serviceTypeOptions = Object.keys(ServiceType)
  .filter(key => isNaN(Number(key)))
  .map(key => ({
    value: ServiceType[key as keyof typeof ServiceType] + "",
    label: key
  }));

  return (
     <div className='flex gap-4 flex-col'>
      <Input 
        id='bikeBrand' 
        onChange={(event) => setBikeBrand(event.target.value)} 
        placeholder='Orbea' 
        value={bikeBrand}
        label='Bike Brand'
        />
      <SelectInput 
        items={serviceTypeOptions} 
        selectedValue={ServiceType.BrakeMaintenance.toString()}
        className="w-full"
        onChange={event => setServiceType(+event.target.value)}/>
      <Input 
        id='notes' 
        onChange={(event) => setNotes(event.target.value)} 
        placeholder='...' 
        value={notes}
        label='Notes'
        />
      <Button onClick={() => setState(StateMachine.CustomerPage)} label='Back'/>
      <Button onClick={newOrder} label='Send Request'/>
   </div>
  )
}
