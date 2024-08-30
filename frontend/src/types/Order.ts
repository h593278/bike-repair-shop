import { ServiceType } from "./ServiceType";

export interface Order {
  id: number;
  customerId: number;
  serviceType: ServiceType;
  expectedDueDate: string; // or Date if you parse it later
  bikeBrand?: string;
  note?: string;
}