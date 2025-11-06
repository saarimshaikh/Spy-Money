import React from 'react';
import type { Transaction } from '../types';
import CircularProgress from './CircularProgress';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import EditIcon from './icons/EditIcon';

interface DashboardProps {
  budget: number;
  totalSpent: number;
  transactions: Transaction[];
  onAddTransaction: (description: string, amount: number, category: string) => void;
  onDeleteTransaction: (id: string) => void;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  budget,
  totalSpent,
  transactions,
  onAddTransaction,
  onDeleteTransaction,
  onReset,
}) => {
  const remaining = budget - totalSpent;
  const percentage = (totalSpent / budget) * 100;

  return (
    <div className="space-y-8">
      <div className="relative bg-secondary p-6 rounded-xl shadow-2xl border border-border-color grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <button
            onClick={onReset}
            className="absolute top-4 right-4 text-text-secondary hover:text-accent transition-colors p-2 rounded-full"
            aria-label="Edit Budget"
        >
            <EditIcon />
        </button>
        <div className="flex justify-center">
          <CircularProgress percentage={percentage} remaining={remaining} />
        </div>
        <div className="text-center md:text-left space-y-2">
            <div className="bg-primary p-4 rounded-lg border border-border-color">
                <p className="text-sm text-text-secondary">Monthly Budget</p>
                <p className="text-2xl font-bold text-cyan-400">
                ₹{budget.toLocaleString('en-IN')}
                </p>
            </div>
            <div className="bg-primary p-4 rounded-lg border border-border-color">
                <p className="text-sm text-text-secondary">Total Spent</p>
                <p className="text-2xl font-bold text-red-500">
                ₹{totalSpent.toLocaleString('en-IN')}
                </p>
            </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-secondary p-6 rounded-xl shadow-2xl border border-border-color">
          <h3 className="text-xl font-bold mb-4">Add New Expense</h3>
          <TransactionForm onAddTransaction={onAddTransaction} />
        </div>
        <div className="bg-secondary p-6 rounded-xl shadow-2xl border border-border-color">
          <h3 className="text-xl font-bold mb-4">Transaction History</h3>
          <TransactionList transactions={transactions} onDeleteTransaction={onDeleteTransaction} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
