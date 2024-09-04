import { useState } from "react"
import { Button } from "../components/buttons/button"
import { Input } from "../components/inputs/input"
import { Customer } from "../types/Customer"
import { StateMachine } from "../types/StateMachine"
import { ServiceType } from "../types/ServiceType"
import { Order } from "../types/Order"
import { SelectInput } from "../components/inputs/select"
import { AddOrder, getCustomer } from "../utils/Api"
import { ServiceTypeName } from "../utils/serviceTypeUtil"

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
  const [date, setDate] = useState<Date>(new Date())
  const [serviceType, setServiceType] = useState<ServiceType>(ServiceType.BrakeMaintenance)

  const generateExpectedDueDate = (): Date => {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 3)
    return currentDate
  }

  const newOrder = async (event: React.FormEvent) => {
    console.log("enter new order func")
    event.preventDefault()

    if (bikeBrand === "") {
      return
    }

    if (!customer) {
      setState(StateMachine.HomePage)
      return
    }

    const order: Order = {
      id: 0,
      customerId: customer.id,
      expectedDueDate: date.toISOString().split("T")[0],
      serviceType: serviceType,
      bikeBrand: bikeBrand,
      note: notes,
    }

    const addCustomerResponse = await AddOrder(order)
    if (addCustomerResponse.status !== 201) {
      return
    }

    const newCustomerResponse: Response = await getCustomer(customer.id)
    if (newCustomerResponse.status === 200) {
      setCustomer(await newCustomerResponse.json())
      setState(StateMachine.ReceiptPage)
    }
  }

  const serviceTypeOptions = Object.keys(ServiceType)
    .filter((key) => isNaN(Number(key)))
    .map((key) => {
      const serviceTypeValue = ServiceType[key as keyof typeof ServiceType]
      return {
        value: serviceTypeValue + "",
        label: ServiceTypeName(serviceTypeValue),
      }
    })

  return (
    <form className="flex gap-6 flex-col text-left" onSubmit={newOrder}>
      <Input 
        id="bikeBrand" 
        onChange={(event) => setBikeBrand(event.target.value)} 
        placeholder="Orbea" 
        value={bikeBrand}
        label="Bike Brand"
      />
      <div className="flex flex-col">
        <label>Finish time (min three days)</label>
        <input 
          id="finishDate" 
          onChange={(event) => setDate(new Date(event.target.value))} 
          placeholder="Orbea" 
          min={generateExpectedDueDate().toISOString().split("T")[0]}
          type="date"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <SelectInput 
        items={serviceTypeOptions} 
        selectedValue={ServiceType.BrakeMaintenance.toString()}
        className="w-full gap-1"
        onChange={(event) => setServiceType(+event.target.value)}
        label="Service Type"
      />
      <Input 
        id="notes" 
        onChange={(event) => setNotes(event.target.value)} 
        placeholder="..." 
        value={notes}
        label="Notes"
        required={false}
      />
      <Button onClick={() => setState(StateMachine.CustomerPage)} label="Back" />
      <Button onClick={() => null} label="Send Request" />
    </form>
  )
}
