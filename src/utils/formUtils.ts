import {
  ExpenseFormDataType,
  ExpenseFormErrorsType,
} from "@/components/ExpenseFormModal";

export const formatInputValue = (
  val: string,
  key: unknown | "amount"
): string | number => {
  let formattedValue: string | number = val;
  if (key === "amount") {
    if (Number.isNaN(Number(formattedValue)) || Number(formattedValue) < 0) {
      formattedValue = 1;
    }
    formattedValue = Number(formattedValue);
  }
  return formattedValue;
};

export const validateForm = (
  formData: ExpenseFormDataType
): ExpenseFormErrorsType | null => {
  let errors: null | ExpenseFormErrorsType = { amount: "", date: "", name: "" };
  let isError = false;
  if (formData.amount <= 0) {
    errors.amount = "Amount can not be 0";
    isError = true;
  }
  if (formData.name.trim().length <= 0) {
    errors.name = "Expense Name is Required";
    isError = true;
  }

  if (formData.date.trim().length <= 0) {
    errors.date = "Expense Date is Required";
    isError = true;
  }

  if (isError) return errors;
  return null;
};
