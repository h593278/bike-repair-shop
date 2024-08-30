import { ChangeEvent, useState } from 'react'

import './App.css'
import { getCustomerByEmail, getCustomers } from './Api'
import { Customer } from './types/Customer'

function App() {
  
  // const [state, setState] = useState<number>(1)
  const [email, setEmail] = useState<string>("ole.nod%40grg.com")
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [customers, setCustomers] = useState<Customer[]>([])

  const setUser = async () => {
    const response: Response = await getCustomerByEmail(email)

    if (response.status === 200) {
      setCustomer(await response.json())
    }
  }
  const setUsers = async () => {
    const response: Response = await getCustomers()

    if (response.status === 200) {
      setCustomers(await response.json())
    }
  }


  return (
    <>
      <h1>Bike Repair</h1>
      <p>Do you need a repair of your Bike, then you hav com to the right place </p>
      <p>Email</p>

      <input type='text' placeholder='ola.nordman@gmail.com' onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
      <button onClick={setUser}>New request</button>
      <p>Customer Name: {customer?.name}</p>
      <button onClick={setUsers}>New request</button>
      <p>Customers Name: {customers.length > 0 && customers[0].name}</p>
    </>
  )
}

export default App
