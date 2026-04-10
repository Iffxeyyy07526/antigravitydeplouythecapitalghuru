export type Plan = 'monthly' | 'six_month' | 'yearly';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  address: string | null;
  mobile_number: string | null;
  telegram_id: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: Plan;
  status: 'active' | 'expired' | 'cancelled';
  started_at: string;
  expires_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  plan: Plan;
  payment_id: string;
  status: 'success' | 'failed';
  created_at: string;
}
