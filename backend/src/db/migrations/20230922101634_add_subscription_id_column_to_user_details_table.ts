import { type Knex } from 'knex';

const TableName = {
  USER_DETAILS: 'user_details',
  SUBSCRIPTIONS: 'subscriptions',
} as const;

const ColumnName = {
  ID: 'id',
  SUBSCRIPTION_ID: 'subscription_id',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
    table
      .integer(ColumnName.SUBSCRIPTION_ID)
      .references(ColumnName.ID)
      .inTable(TableName.SUBSCRIPTIONS)
      .nullable();
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
    table.dropColumn(ColumnName.SUBSCRIPTION_ID);
  });
}

export { down, up };
