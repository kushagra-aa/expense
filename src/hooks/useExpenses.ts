"use client";

import {
  ExpenseAddPayloadType,
  ExpenseEditPayloadType,
  ExpenseEntity,
} from "@/types/entities/expense.entity";
import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "./context/expenseContext";
import { ExpenseFilterType } from "@/components/ExpensesFilters";

function useExpenses() {
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const [shownExpenses, setSetShownExpenses] = useState(expenses);
  const [isLoading, setIsLoading] = useState(true);

  const getExpenses = async (filters?: ExpenseFilterType) => {
    if (!filters) return setSetShownExpenses(expenses);
    let filteredExpenses = expenses;
    if (filters.name && filters.name.trim().length > 0) {
      filteredExpenses = filteredExpenses.filter((e) =>
        e.name.includes(filters.name)
      );
    }
    if (filters.date && filters.date.trim().length > 0) {
      filteredExpenses = filteredExpenses.filter(
        (e) => e.date === filters.date
      );
    }
    if (filters.amount && filters.amount > 0) {
      filteredExpenses = filteredExpenses.filter(
        (e) => e.amount === filters.amount
      );
    }
    setSetShownExpenses(filteredExpenses);
  };

  const addExpense = async (payload: ExpenseAddPayloadType) => {
    const expense: ExpenseEntity = { ...payload, id: Date.now() };
    setIsLoading(true);
    setExpenses([...expenses, expense]);
    setIsLoading(false);
  };
  const editExpense = async (
    id: ExpenseEntity["id"],
    paylaod: ExpenseEditPayloadType
  ) => {
    setIsLoading(true);
    setExpenses(expenses.map((e) => (e.id === id ? { ...e, ...paylaod } : e)));
    setIsLoading(false);
  };
  const deleteExpense = async (id: ExpenseEntity["id"]) => {
    setIsLoading(true);
    setExpenses(expenses.filter((e) => e.id !== id));
    setIsLoading(false);
  };

  useEffect(() => {
    setSetShownExpenses(expenses);
  }, [expenses]);

  return {
    isLoading,
    getExpenses,
    expenses: shownExpenses,
    addExpense,
    editExpense,
    deleteExpense,
  };
}

export default useExpenses;
