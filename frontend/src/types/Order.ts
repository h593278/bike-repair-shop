export interface Order {
  id: number;
  customerId: number;
  serviceType: string;
  expectedDueDate: string; // or Date if you parse it later
  bikeBrand?: string;
  note?: string;
}