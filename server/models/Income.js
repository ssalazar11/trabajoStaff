import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      //required: true,
    },
    client: {
      name: {
        type: String,
        //required: true,
      },
      address: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      coments: {
        type: String,
      },
    },
    seller: {
      type: String,
    },
    items: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          //required: true,
        },
        quantity: {
          type: Number,
          //required: true,
        },
        sellingPrice: {
          type: Number,
          //required: true,
        },
      },
    ],
    total: {
      type: Number,
      //required: true,
    },
    paymentMethod: {
      type: String,
    },
    invoiceNumber: {
      type: String,
    },
  },
  { timestamps: true } // Habilita los timestamps automáticos (created_at, updated_at)
);

const Income = mongoose.model("Income", incomeSchema);

export default Income;
