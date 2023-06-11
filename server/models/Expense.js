import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    provider: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        purchasePrice: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
    },
    invoiceNumber: {
      type: String,
    },
    // Other relevant fields for expenses
  },
  { timestamps: true } // Habilita los timestamps automáticos (created_at, updated_at)
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
