import Expense from "../models/Expense.js";
import Product from "../models/Product.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.send(expenses);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const createExpense = async (req, res) => {
  try {
    const { date, provider, items, paymentMethod, invoiceNumber } = req.body;

    // Obtener detalles de los productos
    const itemsWithDetails = await Promise.all(
      items.map(async (item) => {
        const { product, quantity, purchasePrice } = item;

        // Buscar el producto en la colección de productos
        const productFound = await Product.findById(product);

        if (!productFound) {
          throw new Error(`Product not found: ${product}`);
        }

        const { name } = productFound;

        return {
          product,
          name,
          quantity,
          purchasePrice,
          subtotal: quantity * purchasePrice,
        };
      })
    );

    // Calcular el monto total del gasto
    const totalAmount = itemsWithDetails.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    // Crear el documento de gasto
    const newExpense = new Expense({
      date,
      provider,
      items: itemsWithDetails,
      totalAmount,
      paymentMethod,
      invoiceNumber,
    });

    await newExpense.save();

    return res.json(newExpense);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const { date, provider, items, paymentMethod, invoiceNumber } = req.body;

    // Obtén el documento original del gasto antes de la actualización
    const originalExpense = await Expense.findById(expenseId);

    if (!originalExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Calcula el nuevo valor de "totalAmount" basado en los cambios realizados
    let newTotalAmount = originalExpense.totalAmount;

    // Verifica si hubo cambios en los precios de compra, la cantidad o los productos
    if (
      JSON.stringify(originalExpense.items) !== JSON.stringify(items) ||
      originalExpense.paymentMethod !== paymentMethod ||
      originalExpense.invoiceNumber !== invoiceNumber
    ) {
      newTotalAmount = calculateTotalAmount(items);
    }

    // Actualiza el campo "totalAmount" del documento con el nuevo valor calculado
    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      {
        date,
        provider,
        items,
        totalAmount: newTotalAmount,
        paymentMethod,
        invoiceNumber,
      },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.json(updatedExpense);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Función para calcular el nuevo valor de "totalAmount" basado en los cambios realizados en los precios de compra, la cantidad o los productos
const calculateTotalAmount = (items) => {
  let totalAmount = 0;

  items.forEach((item) => {
    const { quantity, purchasePrice } = item;
    totalAmount += quantity * purchasePrice;
  });

  return totalAmount;
};


export const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res.json(expense);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};
