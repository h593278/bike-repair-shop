import { Button } from "../components/buttons/button"
import { Customer } from "../types/Customer"
import { StateMachine } from "../types/StateMachine"
import { Typography } from "../components/typography"
import { Order } from "../types/Order"
import { ServiceType } from "../types/ServiceType"

interface IReceiptPageProps {
  customer: Customer | null
  setState: (state: StateMachine) => void
}

export const ReceiptPage = ({
  customer,
  setState,
}: IReceiptPageProps): JSX.Element => {
  // if (!customer || customer.orders.length > 0) {
  //   setState(StateMachine.HomePage)
  // }
  const order: Order | undefined = customer?.orders[customer.orders.length - 1]

  if (!order) {
    return (<Typography>Error</Typography>)
  }

  return (
     <div className='flex gap-4 flex-col'>
      <Typography variant="h2">Request accepted!</Typography>
      <Typography>Tank you for choosing us!</Typography>
      <Typography>Bike Brand: {order.bikeBrand}</Typography>
      <Typography>Service Type: {ServiceType[order.serviceType]}</Typography>
      <Typography>Finish Time: {order.expectedDueDate}</Typography>
      <Typography>Noted: {order.note}</Typography>
      <Button onClick={() => setState(StateMachine.OrderPage)} label='New Request'/>
      <Button onClick={() => setState(StateMachine.CustomerPage)} label='Personal page'/>
   </div>
  )
}
