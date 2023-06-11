import { Router } from "express";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpense,
} from "../controllers/expense.controllers.js";

const router = Router();

router.get("/expenses", getExpenses);
router.post("/expenses", createExpense);
router.put("/expenses/:expenseId", updateExpense);
router.delete("/expenses/:expenseId", deleteExpense);
router.get("/expenses/:expenseId", getExpense);

export default router; 
