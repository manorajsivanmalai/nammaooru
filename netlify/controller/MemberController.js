const { AppDataSource } = require('../model/dbconnect/data-source');
const Members = require('../model/Membertable');  // Ensure correct path


exports.createMember = async (req, res) => {
  try {
    const { name, amount, category } = req.body;
    const memberRepository = AppDataSource.getRepository(Members);

    const newMember = memberRepository.create({
      name,
      amount,
      category,
      createdAt: new Date(),  
      updatedAt: new Date(),
    });

    const savedMember = await memberRepository.save(newMember);
    res.status(201).json(savedMember);  // Return created member
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create Member' });
  }
};

// Get all Members
exports.getMembers = async (req, res) => {
  try {
    const memberRepository = AppDataSource.getRepository(Members);
    const members = await memberRepository.find();
    res.status(200).json(members);  // Return all members
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve members' });
  }
};

// Update a Member
exports.updateMember = async (req, res) => {
  const { id } = req.params;
  const { name, amount, category } = req.body;

  try {
    const memberRepository = AppDataSource.getRepository(Members);
    const member = await memberRepository.findOne({ where: { id } });

    if (member) {
      member.name = name;
      member.amount = amount;
      member.category = category;
      member.updatedAt=new Date();
      const updatedMember = await memberRepository.save(member);
      return res.status(200).json(updatedMember);
    }

    res.status(404).json({ error: 'Member not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update Member' });
  }
};

// Delete a Member
exports.deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    const memberRepository = AppDataSource.getRepository(Members);

    const deleteResult = await memberRepository.delete(id);

    if (deleteResult.affected > 0) {
      return res.status(200).json({ message: 'Member deleted successfully' });
    }

    res.status(404).json({ error: 'Member not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete Member' });
  }
};
