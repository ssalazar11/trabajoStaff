import mongoose from "mongoose";
import dotenv from "dotenv";
import {MONGODB_URI} from './config.js'

dotenv.config();

export async function connectDB() {
  try {
    const db = await mongoose.connect("mongodb+srv://admin:<12345>@cluster0.hmxbgzr.mongodb.net/",{
      useNewUrlParser:true,
      useUnifiedTopology:true
    });

    console.log("DB is connected to:", db.connection.name);
  } catch (error) {
    console.log(error);
  }
}
