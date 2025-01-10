const { EntitySchema } = require('typeorm');

const Expenses = new EntitySchema({
  name: 'Expenses',
  tableName: 'Expenses',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    reason: {
      type: String,
    },
    amount: {
      type: Number,
    },

    createdAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP', 
      nullable: false,
    },
    updatedAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      nullable: false,
    },
  },
});

module.exports = Expenses;
