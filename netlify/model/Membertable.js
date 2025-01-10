const { EntitySchema } = require('typeorm');

const Members = new EntitySchema({
  name: 'Members',
  tableName: 'Members',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    amount: {
      type: Number,
    },
    category: {
      type: String,
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

module.exports = Members;
