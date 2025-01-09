 const Member = require('../model/Membertable');

// Create a new Member
exports.createMember = async (req, res) => {
  try {
    const { name, amount, category } = req.body;
    const member = await Member.create({
      name,
      amount,
      category,
    });
    res.status(201).json(member); // Send the created Member back as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create Member' });
  }
};

// Get all Members
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.findAll();
    res.status(200).json(members); // Send the expenses back as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
};

exports.updateMember = async (req, res) => {
  const { id } = req.params;
  const { name, amount,category } = req.body;
 
  try {
    const [updated] = await Member.update(
      { name, amount,category },
      { where: { id } }
    );

    if (updated) {
      const updatedMember = await Member.findOne({ where: { id } });
      return res.status(200).json(updatedMember); 
    }

    throw new Error('Member not found');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update Member' });
  }
};


exports.deleteMember = async (req, res) => {
  const { id } = req.params; 

  try {
    const deleted = await Member.destroy({
      where: { id }
    });

    if (deleted) {
      return res.status(200).json({ message: 'Member deleted successfully' });
    }

    throw new Error('Member not found');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete Member' });
  }
};
