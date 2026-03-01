export type Page = 'dashboard' | 'transactions' | 'budgets' | 'import' | 'insights' | 'settings';

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  category: string;
  account: string;
  amount: number;
  status: 'completed' | 'pending' | 'flagged';
}

export interface Budget {
  category: string;
  allocated: number;
  spent: number;
  color: string;
}

export interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
}
