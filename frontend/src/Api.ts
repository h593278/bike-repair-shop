
const PATH = "http://localhost:5275/api/"
const CustomerPath = PATH + "Customers/"

const CustomerEmailPath = (email: string) => CustomerPath + "byemail/" + email
const CustomerIdPath = (id: string | number) => CustomerPath + id

type Methods = 
  | "GET"
  | "PUT"
  | "POST"
  | "DELETE"

/**
 * Send a request to the BikeRepairAPI
 * @param path Path to the API
 * @param method What method to be used
 * @param body Data to be placed in the body (only used for POST and PUT)
 * @returns The result from the request
 */
export const request = async (path: string, method: Methods, body: JSON | null = null): Promise<Response> => {
  const options: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  // Only add the body if the method is POST or PUT
  if (method === "POST" || method === "PUT") {
    options.body = JSON.stringify(body)
  }

  return await fetch(path, options)
}


export const getCustomerByEmail = async (email: string): Promise<Response> => {
  return await request(CustomerEmailPath(email), "GET")
}
export const getCustomer = async (id: number): Promise<Response> => {
  return await request(CustomerIdPath(id), "GET")
}
export const getCustomers = async (): Promise<Response> => {
  return await request(CustomerPath, "GET")
}
export const AddCustomer = async (): Promise<Response> => {
  return await request(CustomerPath, "POST")
}
export const UpdateCustomer = async (): Promise<Response> => {
  return await request(CustomerPath, "PUT")
}
export const DeleteCustomer = async (): Promise<Response> => {
  return await request(CustomerPath, "DELETE")

}