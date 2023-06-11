import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //required: true,
      trim: true,
    },
    description: {
      type: String,
      //required: true,
      trim: true,
    },
    category: {
      type: String,
      //required: true,
      trim: true,
    },
    image: {
      url: String,
      public_id: String,
    },
    // features: {
    //   type: String,
    //   //required: true,
    //   trim: true,
    // },
    // color: {
    //   type: String,
    //   //required: true,
    //   trim: true,
    // },
    // weight: {
    //   type: Number,
    //   //required: true,
    // },
    // purchasePrice: {
    //   type: Number,
    //   //required: true,
    // },
    sellingPrice: {
      type: Number,
      //required: true,
    },
  },
  { timestamps: true } // Habilita los timestamps automáticos (created_at, updated_at)
);

const Product = mongoose.model("Product", productSchema);

export default Product;
