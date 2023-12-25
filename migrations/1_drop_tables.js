// NPM Modules
import knex from 'knex';
import knexConfigs from '../knex.configs';

// Local Modules
import { LoggerUtil } from '../src/utils';

function down(pg) {
  return pg.schema
    .dropTableIfExists('products')
    .dropTableIfExists('users')
    .dropTableIfExists('slides')
    .dropTableIfExists('footers')
    .dropTableIfExists('orders')
    .dropTableIfExists('about')
    .dropTableIfExists('contact')
    .dropTableIfExists('product_statuses')
    .dropTableIfExists('storage')
    .dropTableIfExists('storage_name');
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await down(pg);
    console.log('Successfully dropped all tables ... ');
    process.kill(process.pid);
  } catch (error) {
    LoggerUtil.error(error.message);
  }
}

init();
