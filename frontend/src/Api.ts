
const PATH = "http://localhost:5275/api"

export const getCustomerByEmail = async (email: string): Promise<Response> => {
  const path = PATH + "/Customers/byemail/" + email
  return await fetch(path, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
  })
}
export const getCustomers = async (): Promise<Response> => {
  const path = PATH + "/Customers"
  return await fetch(path, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
  })
}