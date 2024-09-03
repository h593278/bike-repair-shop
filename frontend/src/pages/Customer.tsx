import { Button } from "../components/buttons/button"
import { Customer } from "../types/Customer"
import { StateMachine } from "../types/StateMachine"
import { Typography } from "../components/typography"
import { Order } from "../types/Order"
import { ServiceType } from "../types/ServiceType"
import { ArrowRightIcon } from "@heroicons/react/20/solid"
import { ServiceTypeIcon } from "../utils/serviceTypeUtil"

interface ICustomerPageProps {
  customer: Customer | null
  setState: (state: StateMachine) => void
  setOrderId: (orderId: number) => void
  
}

export const CustomerPage = ({
  customer,
  setState,
  setOrderId,
}: ICustomerPageProps): JSX.Element => {
  if (!customer) {
    setState(StateMachine.HomePage)
    return <Typography>Error</Typography>
  }
  const orders: Order[] = customer.orders

  const goToOrder = (orderId: number) => {
    setOrderId(orderId)
    setState(StateMachine.BikeRepairTaskPage)
  }

  return (
     <div className='flex gap-4 flex-col'>
      <Typography variant="h2">My page: { customer.name }</Typography>
      <Typography variant="h3">Your bike repairs</Typography>
      <ul>

        {orders.map((order) => (
          <li key={order.id} className="border-solid my-2 bg-sky-50 rounded-md">
            <button onClick={() => goToOrder(order.id)} className="flex justify-between w-full items-center py-1 px-4">
              <Typography className="flex-1">{order.bikeBrand}</Typography>
              <Typography className="flex-2">{ServiceTypeIcon(order.serviceType)} </Typography>
              <Typography className="flex-1">{new Date(order.expectedDueDate).toLocaleDateString('en-GB', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                })}
              </Typography>
              <ArrowRightIcon className="w-4 h-4 flex-2"/>
            </button>
          </li>
        ))}
      </ul>
      <Button onClick={() => setState(StateMachine.OrderPage)} label='New request'/>
      <Button onClick={() => setState(StateMachine.HomePage)} label='Home Screen'/>
   </div>
  )
}
