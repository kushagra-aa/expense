"use client";

import {
  ExpenseAddPayloadType,
  ExpenseEditPayloadType,
  ExpenseEntity,
} from "@/types/entities/expense.entity";
import React, { useState } from "react";
import Button from "./ui/Button";
import { formatInputValue, validateForm } from "@/utils/formUtils";
import Modal from "./ui/Modal";

export type ExpenseFormDataType = {
  name: string;
  amount: number;
  date: string;
  id?: ExpenseEntity["id"];
};
export type ExpenseFormErrorsType = {
  name: string;
  amount: string;
  date: string;
};

const defaultExpenseFormData: ExpenseFormDataType = {
  name: "",
  amount: 1,
  date: "",
};

const defaultExpenseFormErrors: ExpenseFormErrorsType = {
  name: "",
  amount: "",
  date: "",
};

function ExpenseFormModal({
  handleClose,
  handleSubmit,
  expense,
}: {
  expense?: ExpenseEntity | null;
  handleSubmit: (
    type: "add" | "edit",
    payload: ExpenseAddPayloadType | ExpenseEditPayloadType
  ) => void;
  handleClose: () => void;
}) {
  const [formData, setFormData] = useState(expense ?? defaultExpenseFormData);
  const [formErrors, setFormErrors] = useState<ExpenseFormErrorsType>(
    defaultExpenseFormErrors
  );

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof ExpenseFormDataType
  ) => {
    let formattedValue = formatInputValue(e.target.value, key);
    setFormData((f) => ({ ...f, [key]: formattedValue }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = validateForm(formData);
    if (validationResult) {
      setFormErrors(() => ({
        amount: validationResult.amount,
        date: validationResult.date,
        name: validationResult.name,
      }));
      return;
    }
    if (formData.id) handleSubmit("edit", formData);
    else handleSubmit("add", formData);
    handleClose();
  };

  return (
    <Modal
      handleClose={handleClose}
      title={`${expense ? "Edit" : "Add"} Expense`}
    >
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <label className="text-lg font-medium" htmlFor="expense_name">
            Expense Name
          </label>
          <input
            required
            type="text"
            name="expense_name"
            id="expense_name"
            value={formData.name}
            onChange={(e) => handleInputChange(e, "name")}
            className={`border border-gray-800 px-4 py-2 rounded ${
              formErrors.name !== "" && "border-red-600"
            }`}
          />
          {formErrors.name !== "" && (
            <span className="text-red-400 text-sm">{formErrors.name}</span>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <label className="text-lg font-medium" htmlFor="expense_amount">
            Expense Amount
          </label>
          <input
            required
            type="number"
            name="expense_amount"
            id="expense_amount"
            value={formData.amount}
            onChange={(e) => handleInputChange(e, "amount")}
            className={`border border-gray-800 px-4 py-2 rounded ${
              formErrors.amount !== "" && "border-red-600"
            }`}
          />
          {formErrors.amount !== "" && (
            <span className="text-red-400 text-sm">{formErrors.amount}</span>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <label className="text-lg font-medium" htmlFor="expense_date">
            Expense Date
          </label>
          <input
            required
            type="date"
            name="expense_date"
            id="expense_date"
            value={formData.date}
            onChange={(e) => handleInputChange(e, "date")}
            className={`border border-gray-800 px-4 py-2 rounded ${
              formErrors.date !== "" && "border-red-600"
            }`}
          />
          {formErrors.date !== "" && (
            <span className="text-red-400 text-sm">{formErrors.date}</span>
          )}
        </div>
        <div className="flex gap-8">
          <Button color="bg-green-500" type="submit">
            <span className="font-bold text-white">Submit</span>
          </Button>
          <Button color="bg-red-500" onClick={handleClose}>
            <span className="font-bold text-white">Close</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ExpenseFormModal;
