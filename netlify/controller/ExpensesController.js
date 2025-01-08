const Expenses = require('../model/Expensestable');

// Create a new Expenses
exports.createExpenses = async (req, res) => {
  try {
    const { reason, amount } = req.body;
    console.log(reason ,amount);
    
    const expense = await Expenses.create({
      reason,
      amount,
    });
    res.status(201).json(expense); // Send the created Expenses back as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create Expenses' });
  }
};

// Get all Expensess
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expenses.findAll();
    res.status(200).json(expenses); // Send the expenses back as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
};
