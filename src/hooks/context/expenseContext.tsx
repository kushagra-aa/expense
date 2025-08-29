"use client";

import { EXPENSES } from "@/data/expenses";
import { ExpenseEntity } from "@/types/entities/expense.entity";
import { Context, createContext, ReactNode, useContext, useState } from "react";

type ExpenseContextType = {
  expenses: ExpenseEntity[];
  setExpenses: (expenses: ExpenseEntity[]) => void;
};
export const ExpenseContext: Context<ExpenseContextType> = createContext({
  expenses: [...EXPENSES],
  setExpenses(expenses) {},
});

function ExpenseContextWrapper({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<ExpenseEntity[]>(EXPENSES);
  const setExpensesExpanded = (e: ExpenseEntity[]) => {
    setExpenses(e);
  };
  return (
    <ExpenseContext.Provider
      value={{ expenses: expenses, setExpenses: setExpensesExpanded }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export default ExpenseContextWrapper;
