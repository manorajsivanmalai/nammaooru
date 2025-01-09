const Expenses = require('../model/Expensestable');


exports.createExpenses = async (req, res) => {
  try {
    const { reason, amount } = req.body;
    console.log(reason ,amount);
    
    const expense = await Expenses.create({
      reason,
      amount,
    });
    res.status(201).json(expense); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create Expenses' });
  }
};


exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expenses.findAll();
    res.status(200).json(expenses); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
};

exports.updateExpenses = async (req, res) => {
  const { id } = req.params;
  const { reason, amount } = req.body;
 console.log(id,reason);
 
  try {
    const [updated] = await Expenses.update(
      { reason, amount },
      { where: { id } }
    );

    if (updated) {
      const updatedExpense = await Expenses.findOne({ where: { id } });
      return res.status(200).json(updatedExpense); 
    }

    throw new Error('Expense not found');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update expense' });
  }
};


exports.deleteExpenses = async (req, res) => {
  const { id } = req.params; 

  try {
    const deleted = await Expenses.destroy({
      where: { id }
    });

    if (deleted) {
      return res.status(200).json({ message: 'Expense deleted successfully' });
    }

    throw new Error('Expense not found');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};