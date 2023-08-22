import { type Knex } from 'knex';

import {
  createTableWithCommonColumns,
  dropTableIfExists,
} from '#db/helpers/migration-helper.js';

const TABLE_NAME = 'users';

const ColumnName = {
  EMAIL: 'email',
  PASSWORD_HASH: 'password_hash',
  PASSWORD_SALT: 'password_salt',
};

const up = createTableWithCommonColumns(
  TABLE_NAME,
  (table: Knex.CreateTableBuilder) => {
    table.string(ColumnName.EMAIL).unique().notNullable();
    table.text(ColumnName.PASSWORD_HASH).notNullable();
    table.text(ColumnName.PASSWORD_SALT).notNullable();
  },
);

const down = dropTableIfExists(TABLE_NAME);

export { down, up };
