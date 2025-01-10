const { AppDataSource,initializeDataSource  } = require('../model/dbconnect/data-source');
const Expenses = require('../model/Expensestable');  // Ensure correct path
async function ensureInitializedAndExecute(fn) {
  // Ensure the data source is initialized
  if (!AppDataSource.isInitialized) {
    await initializeDataSource();
  }

  // Execute the provided database operation function
  return fn();
}
exports.createExpenses = async (req, res) => {
  try {
await ensureInitializedAndExecute(async () => {

    const { reason, amount } = req.body;
    const expenseRepository = AppDataSource.getRepository(Expenses);

    const newExpense = expenseRepository.create({
      reason,
      amount,
      createdAt: new Date(),  
      updatedAt: new Date(),
    });

    const saveExpense = await expenseRepository.save(newExpense);
    res.status(201).json(saveExpense);
    })  // Return created member
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create Member' });
  }
};

// Get all Expenses
exports.getExpenses = async (req, res) => {
  try {
    await ensureInitializedAndExecute(async () => {

    const expenseRepository = AppDataSource.getRepository(Expenses);
    const expenses = await expenseRepository.find();
    res.status(200).json(expenses);  
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve Expenses' });
  }
};

// Update a Member
exports.updateExpenses = async (req, res) => {
  const { id } = req.params;
  const { reason, amount } = req.body;

  try {
await ensureInitializedAndExecute(async () => {

    const expenseRepository = AppDataSource.getRepository(Expenses);
    const expense = await expenseRepository.findOne({ where: { id } });

    if (expense) {
      expense.reason = reason;
      expense.amount = amount;
      expense.updatedAt=new Date();
      const updatedExpense = await expenseRepository.save(expense);
      return res.status(200).json(updatedExpense);
    }
  })
    res.status(404).json({ error: 'Expense not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update Expense' });
  }
};

// Delete a Member
exports.deleteExpenses = async (req, res) => {
  const { id } = req.params;

  try {
await ensureInitializedAndExecute(async () => {

    const expenseRepository = AppDataSource.getRepository(Expenses);

    const deleteResult = await expenseRepository.delete(id);

    if (deleteResult.affected > 0) {
      return res.status(200).json({ message: 'Expense deleted successfully' });
    }
  })
    res.status(404).json({ error: 'Expense not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete Expense' });
  }
};
