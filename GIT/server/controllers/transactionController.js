const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @desc    Transfer meme coins
// @route   POST /api/transactions/transfer
// @access  Private
const transfer = async (req, res) => {
  const { from, to, amount } = req.body;
  try {
    const sender = await User.findById(from);
    const receiver = await User.findById(to);

    if (!sender || !receiver) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    const transaction = await Transaction.create({ from, to, amount });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { transfer };