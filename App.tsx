import React, { useState, useEffect, useMemo } from 'react';
import type { Transaction } from './types';
import BudgetSetup from './components/BudgetSetup';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [budget, setBudget] = useState<number | null>(() => {
    const savedBudget = localStorage.getItem('spyMoneyBudget');
    return savedBudget ? JSON.parse(savedBudget) : null;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('spyMoneyTransactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  useEffect(() => {
    if (budget !== null) {
      localStorage.setItem('spyMoneyBudget', JSON.stringify(budget));
    } else {
      localStorage.removeItem('spyMoneyBudget');
    }
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('spyMoneyTransactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleSetBudget = (amount: number) => {
    if (amount > 0) {
      setBudget(amount);
      setTransactions([]); // Reset transactions when a new budget is set for a new month
    }
  };

  const handleAddTransaction = (description: string, amount: number, category: string) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      description,
      amount,
      date: new Date().toISOString(),
      category,
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };
  
  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleReset = () => {
    setBudget(null);
    setTransactions([]);
    localStorage.removeItem('spyMoneyBudget');
    localStorage.removeItem('spyMoneyTransactions');
  };

  const totalSpent = useMemo(() => {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  return (
    <div className="min-h-screen container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Spy Money
        </h1>
        <p className="text-text-secondary mt-2">Your Personal Expense Watchdog</p>
      </header>

      <main className="w-full max-w-4xl">
        {budget === null ? (
          <BudgetSetup onSetBudget={handleSetBudget} />
        ) : (
          <Dashboard
            budget={budget}
            totalSpent={totalSpent}
            transactions={transactions}
            onAddTransaction={handleAddTransaction}
            onDeleteTransaction={handleDeleteTransaction}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
};

export default App;
