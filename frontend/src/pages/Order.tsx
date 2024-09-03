import { DeleteOrder } from "../Api"
import { Button } from "../components/buttons/button"
import { Typography } from "../components/typography"
import { Customer } from "../types/Customer"
import { Order } from "../types/Order"
import { StateMachine } from "../types/StateMachine"
import { ServiceTypeIconAndName as ServiceTypeNameAndIcon } from "../utils/serviceTypeUtil"

interface IOrderPageProps {
  orderId: number
  customer: Customer | null
  setState: (state: StateMachine) => void
}

export const OrderPage = ({
  orderId,
  customer,
  setState,
}: IOrderPageProps): JSX.Element => {
  const order: Order | undefined = customer?.orders.find(o => o.id == orderId)

  if (!order) {
    return <Typography>Order not found</Typography>
  }

  const deleteOrder = () => {
    DeleteOrder(orderId)
    // customer?.orders.()
    setState(StateMachine.CustomerPage)
  }

  return (
     <div className='flex gap-4 flex-col text-start'>
      <Typography>Bike Brand: {order.bikeBrand}</Typography>
      <Typography className="flex gap-1">Service Type: {ServiceTypeNameAndIcon(order.serviceType)}</Typography>
      <Typography>Finish Time: {order.expectedDueDate}</Typography>
      <Typography>Noted: {order.note}</Typography>
      <Button onClick={() => setState(StateMachine.CustomerPage)} label='Back'/>
      <Button onClick={deleteOrder} label='Delete'/>
   </div>
  )
}
