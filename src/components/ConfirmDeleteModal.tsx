"use client";

import { ExpenseEntity } from "@/types/entities/expense.entity";
import Button from "./ui/Button";
import Modal from "./ui/Modal";

function ConfirmDeleteModal({
  handleClose,
  handleSubmit,
  expense,
}: {
  expense: ExpenseEntity;
  handleSubmit: (payload: ExpenseEntity["id"]) => void;
  handleClose: () => void;
}) {
  const handleConfirm = async () => {
    handleSubmit(expense.id);
    handleClose();
  };

  return (
    <Modal
      handleClose={handleClose}
      title={`Are you sure You want to delete Expense: ${expense.name}?`}
      size={{ h: "h-fit", w: "w-fit" }}
    >
      <div className="flex gap-8">
        {" "}
        <Button color="bg-green-500" type="submit" onClick={handleConfirm}>
          <span className="font-bold text-white">Confirm</span>
        </Button>
        <Button color="bg-red-500" onClick={handleClose}>
          <span className="font-bold text-white">Cancel</span>
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmDeleteModal;
