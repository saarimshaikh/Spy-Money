
import React, { useState } from 'react';

interface BudgetSetupProps {
  onSetBudget: (amount: number) => void;
}

const BudgetSetup: React.FC<BudgetSetupProps> = ({ onSetBudget }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      onSetBudget(numericAmount);
    }
  };

  return (
    <div className="bg-secondary p-8 rounded-xl shadow-2xl border border-border-color animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6 text-text-primary">Set Your Monthly Budget</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-text-secondary text-lg">
            INR
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 3000"
            className="w-full bg-primary border border-border-color rounded-lg py-3 pl-16 pr-4 text-text-primary text-lg focus:ring-2 focus:ring-accent focus:outline-none transition"
            min="1"
            step="any"
            required
            autoFocus
          />
        </div>
        <button
          type="submit"
          className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-accent-hover transition-transform transform hover:scale-105"
        >
          Start Tracking
        </button>
      </form>
    </div>
  );
};

export default BudgetSetup;
