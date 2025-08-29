import { ExpenseEntity } from "@/types/entities/expense.entity";
import Button from "./ui/Button";

function ExpenseCard({
  expense,
  handleDelete,
  handleEdit,
}: {
  expense: ExpenseEntity;
  handleEdit: (id: ExpenseEntity["id"]) => void;
  handleDelete: (id: ExpenseEntity["id"]) => void;
}) {
  return (
    <div className="bg-gray-900 text-gray-200 rounded py-6 px-10 flex flex-col gap-3">
      <h3 className="text-xl font-medium capitalize">{expense.name}</h3>
      <p className="text-lg ">
        <span className="font-medium">On:</span>{" "}
        {new Date(expense.date).toLocaleDateString()}
      </p>
      <p className="text-lg font-medium">
        Of: <span className="font-bold">₹ {expense.amount}</span>
      </p>
      <div className="flex gap-4">
        <Button color="bg-green-500" onClick={() => handleEdit(expense.id)}>
          <span className="font-bold text-white">Edit</span>
        </Button>
        <Button color="bg-red-500" onClick={() => handleDelete(expense.id)}>
          <span className="font-bold text-white">Delete</span>
        </Button>
      </div>
    </div>
  );
}

export default ExpenseCard;
