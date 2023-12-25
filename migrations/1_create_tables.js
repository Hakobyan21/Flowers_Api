// NPM Modules
import knex from 'knex';
import knexConfigs from '../knex.configs';

// Local Modules
import { LoggerUtil } from '../src/utils';

function up(pg) {
  return pg.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.specificType('users_id', 'serial').notNullable();
      table.string('adminname').unique().notNullable();
      table.string('avc').notNullable();
      table.string('bank_account').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable();
      table.string('phone').notNullable();
      table.specificType('branch_address', 'text[]');
      table.string('company_name').notNullable();
      table.specificType('payment_method', 'jsonb[]');
      table.json('selected');
      table.string('info');
      table.string('logo');
      table.integer('shipping_mount');
      table.string('role').defaultTo('admin');
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('product_statuses', (table) => {
      table.increments('id').primary();
      table.integer('user_id').notNullable();
      table.string('name').notNullable();
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('products', (table) => {
      table.increments('id').primary();
      table.integer('users_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE');
      table.string('companyName');
      table.specificType('content', 'jsonb[]'); // avelcrac
      table.string('flowerName');
      table.string('picture');
      table.integer('sale');
      table.string('size');
      table.specificType('branch_address', 'text[]');
      table.string('categoryName');
      table.boolean('availability').defaultTo(true);
      table.integer('price');
      table.integer('sale_price');
      table.text('description');
      table.string('product_status').notNullable();
      // table.jsonb('content');
      // table.specificType('branch_address', 'text[]');
      table.integer('product_status_id').unsigned().references('id').inTable('product_statuses');
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })

    .createTable('slides', (table) => {
      table.increments('id').primary();
      table.string('src').notNullable();
      table.string('alt').notNullable();
      table.string('link');
      table.string('text');
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('about', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('position');
      table.string('logo');
      table.string('text');
      table.string('title');
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('contact', (table) => {
      table.increments('id').primary();
      table.text('link');
      table.string('text');
      table.string('title');
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('footers', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.specificType('links', 'jsonb[]');
      table.string('link');
      table.text('icond');
      table.string('title');
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('orders', (table) => {
      table.increments('id').primary();
      table.integer('users_id');
      table.string('companyName');
      table.string('flowerName');
      table.string('picture');
      table.string('sale');
      table.string('size');
      table.string('categoryName');
      table.boolean('availability');
      table.integer('price');
      table.string('sale_price');
      table.string('description');
      table.string('product_status');
      table.string('time');
      table.string('data');
      table.integer('count');
      table.string('address');
      table.specificType('branch_address', 'text[]'); // dzac
      table.string('customerName');
      table.integer('delivery_price');
      table.string('infoDamaphone');
      table.string('infoEntrance');
      table.string('infoFloor');
      table.string('infoHome');
      table.string('infoShipper');
      table.string('mail');
      table.string('customerPhone');
      table.string('customerPhone2');
      table.string('receiverName');
      table.string('receiverPhone');
      table.json('selected');
      table.string('payment_type');
      table.text('text');
      table.integer('product_id');
      table.integer('product_status_id');
      table.specificType('content', 'jsonb[]'); // avelcrac
      table.enum('order_status', ['current', 'confirmed', 'cancelled']).defaultTo('current');
      table.enum('cancel_reason', [
        'Առաքիչի հետ կան խնդիրներ',
        'Ծաղիկը թարմ չէ',
        'Մասնաճյուղը չի աշխատում'
      ]);
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('storage_name', (table) => {
      table.increments('id').primary();
      table.string('branch_address');
      table.string('category_name').notNullable().unique();
      table.integer('users_id');
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })

    .createTable('storage', (table) => {
      table.increments('id').primary();
      table.integer('users_id');
      table.string('category_name');
      table.string('name');
      table.text('picture');
      table.string('branch_address');
      table.specificType('info', 'jsonb[]');
      table.boolean('status_check');
      table.dateTime('created_at');
      table.dateTime('updated_at');
    });
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await up(pg);
    console.log('Successfully created all tables ... ');
    process.kill(process.pid);
  } catch (error) {
    LoggerUtil.error(error.message);
  }
}

init();
