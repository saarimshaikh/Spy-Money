import React from 'react';
import type { Transaction } from '../types';
import TrashIcon from './icons/TrashIcon';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-text-secondary">No transactions yet.</p>
        <p className="text-sm text-gray-500">Add an expense to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between bg-primary p-3 rounded-lg border border-border-color"
        >
          <div>
            <p className="font-medium capitalize text-text-primary">{transaction.description}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-secondary text-text-secondary px-2 py-0.5 rounded-full capitalize border border-border-color">
                {transaction.category}
              </span>
              <p className="text-xs text-text-secondary">
                {new Date(transaction.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-red-500">
              ₹{transaction.amount.toLocaleString('en-IN')}
            </span>
            <button
              onClick={() => onDeleteTransaction(transaction.id)}
              className="text-text-secondary hover:text-danger transition-colors p-1.5 rounded-full"
              aria-label={`Delete transaction for ${transaction.description}`}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
