export type ExpenseEntity = {
  id: number;
  name: string;
  amount: number;
  date: string;
};

export type ExpenseAddPayloadType = Omit<ExpenseEntity, "id">;

export type ExpenseEditPayloadType = Partial<ExpenseEntity>;
