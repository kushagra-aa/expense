"use client";

import { ExpenseEntity } from "@/types/entities/expense.entity";
import React, { useState } from "react";
import Button from "./ui/Button";
import { formatInputValue, validateForm } from "@/utils/formUtils";

export type ExpenseFilterType = {
  name: string;
  amount: number;
  date: string;
};

const defaultExpenseFilters: ExpenseFilterType = {
  name: "",
  amount: 0,
  date: "",
};

function ExpenseFilters({
  handleSubmit,
}: {
  handleSubmit: (filters: ExpenseFilterType) => void;
}) {
  const [formData, setFormData] = useState(defaultExpenseFilters);

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof ExpenseFilterType
  ) => {
    let formattedValue = formatInputValue(e.target.value, key);
    setFormData((f) => ({ ...f, [key]: formattedValue }));
  };

  const handleFormSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    handleSubmit(formData);
  };
  const handleFormReset = async () => {
    handleSubmit(defaultExpenseFilters);
    setFormData(defaultExpenseFilters);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h2 className="text-xl font-bold">Filters:</h2>
        <div className="flex gap-4">
          <Button color="bg-green-500" type="submit" onClick={handleFormSubmit}>
            <span className="font-bold text-white">Search</span>
          </Button>
          <Button color="bg-red-500" type="reset" onClick={handleFormReset}>
            <span className="font-bold text-white">Clear</span>
          </Button>
        </div>
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="w-full flex flex-col sm:flex-row items-center justify-between gap-10 pb-4 border-b border-b-amber-300"
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="expense_name">
            Expense Name
          </label>
          <input
            type="text"
            name="expense_name"
            id="expense_name"
            value={formData.name}
            onChange={(e) => handleInputChange(e, "name")}
            className={`border border-gray-800 px-4 py-2 rounded `}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="expense_amount">
            Expense Amount
          </label>
          <input
            type="number"
            name="expense_amount"
            id="expense_amount"
            value={formData.amount}
            onChange={(e) => handleInputChange(e, "amount")}
            className={`border border-gray-800 px-4 py-2 rounded `}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="expense_date">
            Expense Date
          </label>
          <input
            type="date"
            name="expense_date"
            id="expense_date"
            value={formData.date}
            onChange={(e) => handleInputChange(e, "date")}
            className={`border border-gray-800 px-4 py-2 rounded`}
          />
        </div>
      </form>
    </>
  );
}

export default ExpenseFilters;
