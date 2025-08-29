"use client";

import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import ExpenseCard from "@/components/ExpenseCard";
import ExpenseFormModal from "@/components/ExpenseFormModal";
import ExpenseFilters, {
  ExpenseFilterType,
} from "@/components/ExpensesFilters";
import Button from "@/components/ui/Button";
import useExpenses from "@/hooks/useExpenses";
import {
  ExpenseAddPayloadType,
  ExpenseEditPayloadType,
  ExpenseEntity,
} from "@/types/entities/expense.entity";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseEntity | null>(
    null
  );

  const { expenses, addExpense, deleteExpense, editExpense, getExpenses } =
    useExpenses();

  const handleExpenseAddClick = () => {
    setSelectedExpense(null);
    setIsModalOpen(true);
  };
  const handleExpenseEditClick = (id: ExpenseEntity["id"]) => {
    const foundExpense = expenses.find((e) => e.id === id);
    setSelectedExpense(foundExpense || null);
    if (foundExpense) setIsModalOpen(true);
  };
  const handleExpenseDeleteClick = (id: ExpenseEntity["id"]) => {
    const foundExpense = expenses.find((e) => e.id === id);
    setSelectedExpense(foundExpense || null);
    if (foundExpense) setIsModalConfirmOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsModalConfirmOpen(false);
  };

  const handleDeleteModalSubmit = (id: ExpenseEntity["id"]) => {
    deleteExpense(id);
    toast.success(`Successfully Deleted Expense: ${id}`);
  };
  const handleModalSubmit = (
    type: "add" | "edit",
    e: ExpenseAddPayloadType | ExpenseEditPayloadType
  ) => {
    if (type === "edit") {
      const exp = e as ExpenseEditPayloadType;
      editExpense(exp.id!, exp);
      toast.success("Successfully Edited Expense");
    } else if (type === "add") {
      addExpense(e as ExpenseAddPayloadType);
      toast.success("Successfully Added New Expense");
    }
  };
  const handleFiltersSubmit = (f: ExpenseFilterType) => {
    getExpenses(f);
  };

  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20">
      {isModalOpen && (
        <ExpenseFormModal
          handleClose={handleModalClose}
          handleSubmit={handleModalSubmit}
          expense={selectedExpense}
        />
      )}
      {isModalConfirmOpen && selectedExpense && (
        <ConfirmDeleteModal
          handleClose={handleModalClose}
          handleSubmit={handleDeleteModalSubmit}
          expense={selectedExpense}
        />
      )}
      <Toaster />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex w-full items-center justify-between pb-4 border-b border-b-amber-300">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Expenses:</h1>
            <h2 className="text-xl font-medium">
              Total Expenditure: {expenses.reduce((p, c) => p + c.amount, 0)}
            </h2>
          </div>
          <Button onClick={handleExpenseAddClick}>Add</Button>
        </div>
        <ExpenseFilters handleSubmit={handleFiltersSubmit} />
        <div className="flex flex-wrap gap-8">
          {expenses.length <= 0 ? (
            <p className="text-xl font-medium">No Expenses Found!</p>
          ) : (
            expenses.map((e) => (
              <ExpenseCard
                expense={e}
                key={e.id}
                handleEdit={handleExpenseEditClick}
                handleDelete={handleExpenseDeleteClick}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
