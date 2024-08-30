import { Order } from "./Order";

export interface Customer {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  orders: Order[];
}