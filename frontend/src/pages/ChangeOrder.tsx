import { useState } from "react"
import { Button } from "../components/buttons/button"
import { Input } from "../components/inputs/input"
import { Customer } from "../types/Customer"
import { StateMachine } from "../types/StateMachine"
import { ServiceType } from "../types/ServiceType"
import { Order } from "../types/Order"
import { SelectInput } from "../components/inputs/select"
import { UpdateOrder } from "../utils/Api"
import { ServiceTypeName } from "../utils/serviceTypeUtil"
import { Typography } from "../components/typography"

interface IChangeOrderPageProps {
  customer: Customer | null
  orderId: number
  setState: (state: StateMachine) => void
}

export const ChangeOrderPage = ({
  customer,
  orderId,
  setState,
}: IChangeOrderPageProps): JSX.Element => {
  const order = customer?.orders.find(o => o.id === orderId)
  if (!order) {
    return <Typography>Error order not found</Typography>
  } else if(!customer){
    setState(StateMachine.HomePage)
    return <Typography>Error customer not found</Typography>
  }

  const [bikeBrand, setBikeBrand] = useState<string>(order.bikeBrand)
  const [notes, setNotes] = useState<string>(order.note)
  const [date, setDate] = useState<Date>(new Date(order.expectedDueDate))
  const [serviceType, setServiceType] = useState<ServiceType>(order.serviceType)

  const generateExpectedDueDate = (): Date => {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 3)
    return currentDate
  }

  const updateOrder = async (event: React.FormEvent) => {
    event.preventDefault()

    const newOrder: Order = {
      id: order.id,
      customerId: customer.id,
      expectedDueDate: date.toISOString().split("T")[0],
      serviceType: serviceType,
      bikeBrand: bikeBrand,
      note: notes,
    }

    const addCustomerResponse = await UpdateOrder(order.id, newOrder)
    if (addCustomerResponse.status !== 204) {
      return
    }

    //Update the new order
    customer.orders = customer.orders.map((o) => {
      if (o.id == newOrder.id) {
        return newOrder
      } 
      return o
    })

    setState(StateMachine.CustomerPage)
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
    <form className="flex gap-6 flex-col text-left" onSubmit={updateOrder}>
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
        selectedValue={serviceType.toString()}
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
      <Button onClick={() => setState(StateMachine.OrderPage)} label="Back" />
      <Button onClick={() => null} label="Change request" />
    </form>
  )
}
