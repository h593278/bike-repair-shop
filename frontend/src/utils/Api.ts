import { Customer } from "../types/Customer"
import { Order } from "../types/Order"

//Local
// const PATH = "http://localhost:5275/api/"
//Azure
const PATH = "https://bikeapi.azurewebsites.net/api/"

const CustomerPath = PATH + "Customers/"
const CustomerEmailPath = (email: string) => CustomerPath + "byemail/" + email
const CustomerIdPath = (id: string | number) => CustomerPath + id

const OrderPath = PATH + "Orders/"
const OrderIdPath = (id: string | number) => OrderPath + id

type Methods = 
  | "GET"
  | "PUT"
  | "POST"
  | "DELETE"

/**
 * Send a request to the BikeRepairAPI
 * @param path Path to the API
 * @param method What method to be used
 * @param object Data to be placed in the body (only used for POST and PUT)
 * @returns The result from the request
 */
export const request = async (path: string, method: Methods, object: Order | Customer | null = null): Promise<Response> => {
  const options: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  // Only add the body if the method is POST or PUT
  if (method === "POST" || method === "PUT") {
    options.body = JSON.stringify(object)
  }

  return await fetch(path, options)
}

//Customer
export const getCustomerByEmail = async (email: string): Promise<Response> => {
  return await request(CustomerEmailPath(email), "GET")
}
export const getCustomer = async (id: number): Promise<Response> => {
  return await request(CustomerIdPath(id), "GET")
}
export const getCustomers = async (): Promise<Response> => {
  return await request(CustomerPath, "GET")
}
export const AddCustomer = async (customer: Customer): Promise<Response> => {
  return await request(CustomerPath, "POST", customer)
}
export const UpdateCustomer = async (id: number, customer: Customer): Promise<Response> => {
  return await request(CustomerIdPath(id), "PUT", customer)
}
export const DeleteCustomer = async (id: number): Promise<Response> => {
  return await request(CustomerIdPath(id), "DELETE")
}

//Order
export const getOrder = async (id: number): Promise<Response> => {
  return await request(OrderIdPath(id), "GET")
}
export const getOrders = async (): Promise<Response> => {
  return await request(OrderPath, "GET")
}
export const AddOrder = async (order: Order): Promise<Response> => {
  return await request(OrderPath, "POST", order)
}
export const UpdateOrder = async (id: number, order: Order): Promise<Response> => {
  return await request(OrderIdPath(id), "PUT", order)
}
export const DeleteOrder = async (id: number): Promise<Response> => {
  return await request(OrderIdPath(id), "DELETE")
}