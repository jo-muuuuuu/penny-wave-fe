export interface Bill {
  id: number;
  user_id: number;
  recurring_bill_id: number | null;
  name: string;
  amount: string;
  date: string;
  category: string;
  status: "pending" | "completed";
  created_at: string;
  period?: string;
}

export type NewBillPayload = Omit<Bill, "id" | "user_id" | "created_at">;
