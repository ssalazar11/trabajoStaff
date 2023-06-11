import Income from "../models/Income.js";
import Product from "../models/Product.js";

export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find();
    res.send(incomes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const createIncome = async (req, res) => {
  try {
    const { date, name, email, phone, paymentMethod, coments, total, items } =
      req.body;

    // Crear el documento de ingreso
    const newIncome = new Income({
      date,
      name,
      email,
      phone,
      paymentMethod,
      coments,
      total,
      items,
    });

    await newIncome.save();

    return res.json(newIncome);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const updateIncome = async (req, res) => {
  try {
    const { incomeId } = req.params;
    const { date, client, items, paymentMethod, invoiceNumber, total } =
      req.body;
    console.log(req.body);

    const updatedIncome = await Income.findByIdAndUpdate(
      incomeId,
      {
        date,
        client,
        items,
        paymentMethod,
        invoiceNumber,
        total,
      },
      { new: true }
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    return res.json(updatedIncome);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const { incomeId } = req.params;
    const deletedIncome = await Income.findByIdAndDelete(incomeId);
    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getIncome = async (req, res) => {
  try {
    const { incomeId } = req.params;
    const income = await Income.findById(incomeId);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    return res.json(income);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};
