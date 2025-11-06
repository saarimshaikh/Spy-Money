import React, { useState } from 'react';
import PlusIcon from './icons/PlusIcon';

interface TransactionFormProps {
  onAddTransaction: (description: string, amount: number, category: string) => void;
}

const categories = [
  'Food and beverages',
  'Rent',
  'Light bill',
  'Water bill',
  'Shopping',
  'Phone bill',
  'Money lend',
  'Others',
];

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [otherCategory, setOtherCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    const finalCategory = category === 'Others' ? otherCategory : category;

    if (description && !isNaN(numericAmount) && numericAmount > 0 && finalCategory) {
      onAddTransaction(description, numericAmount, finalCategory);
      setDescription('');
      setAmount('');
      setCategory(categories[0]);
      setOtherCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-text-secondary mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-primary border border-border-color rounded-lg py-2 px-3 text-text-primary focus:ring-2 focus:ring-accent focus:outline-none transition"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {category === 'Others' && (
        <div>
          <label htmlFor="otherCategory" className="block text-sm font-medium text-text-secondary mb-1">
            Other Expenses
          </label>
          <input
            id="otherCategory"
            type="text"
            value={otherCategory}
            onChange={(e) => setOtherCategory(e.target.value)}
            placeholder="e.g., Travel, Healthcare"
            className="w-full bg-primary border border-border-color rounded-lg py-2 px-3 text-text-primary focus:ring-2 focus:ring-accent focus:outline-none transition"
            required
          />
        </div>
      )}
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Coffee, Groceries"
          className="w-full bg-primary border border-border-color rounded-lg py-2 px-3 text-text-primary focus:ring-2 focus:ring-accent focus:outline-none transition"
          required
        />
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-text-secondary mb-1">
          Amount (INR)
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g., 200"
          className="w-full bg-primary border border-border-color rounded-lg py-2 px-3 text-text-primary focus:ring-2 focus:ring-accent focus:outline-none transition"
          min="0.01"
          step="any"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-accent text-white font-bold py-2.5 px-4 rounded-lg hover:bg-accent-hover transition-transform transform hover:scale-105"
      >
        <PlusIcon />
        Add Expense
      </button>
    </form>
  );
};

export default TransactionForm;
