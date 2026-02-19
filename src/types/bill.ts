interface BillBase {
  id: number;
  user_id: number;
  name: string;
  amount: string;
  category: string;
  created_at: string;
}

export interface OnceOffBill extends BillBase {
  recurring_bill_id: number | null;
  date: string;
  direct_debit: boolean;
  status: "pending" | "completed";
}

export interface RecurringBill extends BillBase {
  period: "week" | "fortnight" | "month" | "quarter" | "year";
  start_date: string;
  day_of_month: number | null;
  day_of_week: number | null;
  direct_debit: boolean;
  status: "active" | "paused";
  last_generated_date: string | null;
}

export interface BillFormValues {
  id?: number;
  name: string;
  amount: string;
  due_date: Date;
  direct_debit: boolean;
  recurring: boolean;
  period?: "week" | "fortnight" | "month" | "quarter" | "year";
  category: string;
}
