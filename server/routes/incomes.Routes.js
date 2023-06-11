import { Router } from "express";
import {
  getIncomes,
  createIncome,
  deleteIncome,
  getIncome,
  updateIncome,
} from "../controllers/income.controllers.js";

const router = Router();

router.get("/incomes", getIncomes);
router.post("/incomes", createIncome);
router.put("/incomes/:incomeId", updateIncome);
router.delete("/incomes/:incomeId", deleteIncome);
router.get("/incomes/:incomeId", getIncome);

export default router;
