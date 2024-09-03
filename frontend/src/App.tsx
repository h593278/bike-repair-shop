import { useState } from 'react'

import { Customer } from './types/Customer'
import { Typography } from './components/typography'
import { StateMachine } from './types/StateMachine'
import { HomePage } from './pages/Home'
import { UserInformationPage } from './pages/CustomerInformation'
import { BikeInformationPage } from './pages/BikeInformation'
import { ReceiptPage } from './pages/Receipt'
import { CustomerPage } from './pages/Customer'
import { OrderPage } from './pages/Order'



function App() {
  
  const [state, setState] = useState<StateMachine>(StateMachine.HomePage)
  const [email, setEmail] = useState<string>("")
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [orderId, setOrderId] = useState<number>(0)

 
  const StateMachinePageMap: Record<StateMachine, JSX.Element> = {
    [StateMachine.HomePage]: <HomePage email={email} setEmail={setEmail} setState={setState} setCustomer={setCustomer} />,
    [StateMachine.CustomerInformationPage]: <UserInformationPage email={email} setState={setState} setCustomer={setCustomer} />,
    [StateMachine.OrderPage]: <BikeInformationPage setState={setState} setCustomer={setCustomer} customer={customer}/>,
    [StateMachine.ReceiptPage]: <ReceiptPage setState={setState} customer={customer} />,
    [StateMachine.CustomerPage]: <CustomerPage setState={setState} customer={customer} setOrderId={setOrderId}/>,
    [StateMachine.BikeRepairTaskPage]: <OrderPage setState={setState} customer={customer} orderId={orderId}/>,
  };


  return (
    <div className='flex justify-center w-full'>
      <div className='flex gap-8 flex-col mt-16 m-6 text-center'>
        <Typography variant='h1' className='mb-10'>Bike Repair</Typography>
        <Typography>Do you need a repair of your Bike, then you hav come to the right place </Typography>
        <div className='h-[2px] bg-slate-900'></div>
        {StateMachinePageMap[state]}
      </div>
    </div>
  )
}

export default App
