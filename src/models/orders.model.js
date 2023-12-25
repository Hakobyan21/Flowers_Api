// NPM Modules
import { Model } from 'objection';
import knex from 'knex';
import knexConfigs from '../../knex.configs';

// export { default as UsersModel } from './users.model';
import UsersModel from './users.model';
// Adjust the path if needed
// const usersModelInstance = new UsersModel(); // Creating an instance

const pg = knex(knexConfigs.development);

class OrdersModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'orders'; }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }

  $beforeInsert() {
    const date = new Date();
    this.created_at = date;
  }

  $beforeUpdate() {
    const date = new Date();
    this.updated_at = date;
  }

  // Methods
  static async create(payload) {
    payload.product_id = payload.id;
    delete payload.id;
    return OrdersModel.query().insert(payload);
  }

  // users_id, branch_address
  // Inside the getPriceOrder method of OrdersModel
  static async getPriceOrder(price, users_id,branch_address) {
    try {
    // Fetching data from UsersModel
      const usersData = await UsersModel.query()
        .select('shipping_mount').where('users_id', '=', users_id)
        .andWhere('branch_address', '=', [branch_address]);
        
      console.log(usersData[0].shipping_mount, 5545); // Assuming usersData is an array of user objects

      console.log(price, 'gf');
      let priceWithKm = Math.round(price / 1000);

      if (priceWithKm <= 10) {
        priceWithKm = 1000;
        return { price: priceWithKm };
      }

      return { price: priceWithKm * usersData[0].shipping_mount };
    } catch (error) {
    // Handle any errors that might occur during the query execution
      console.error(error);
      throw new Error('Error fetching user data');
    }
  }

  static async getHistoryByBranch(users_id, branch_address, order_status) {
 
    return OrdersModel.query()
      .select('*')
      .where('users_id', '=', users_id)
      .andWhere('branch_address', '=', [branch_address])
      .andWhere('order_status', '=', order_status)
      .orderBy('id');
  }

  static async getAllHistory(users_id, order_status) {
    return OrdersModel.query()
      .select('*')
      .where('users_id', '=', users_id)
      .andWhere('order_status', '=', order_status)
      .orderBy('id');
  }

  static async getById(id) {
    return OrdersModel.query().select('*').where('id', '=', id);
  }

  static async editOrderStatus(id, order_status) {
    try {
      const info = await OrdersModel.query()
        .update({ id, order_status })
        .where('id', '=', id)
        .returning('*');

      console.log(info, 'JHAFHJAFIHAIFHAUFHIUAFHUIAHFUIAHIUAFHUI');
      let storeData = [];
      for (const j in info[0].content) {
        storeData.push(
          await pg('storage')
            .select('info')
            .where('users_id', '=', info[0].users_id)
            .andWhere('branch_address', '=', info[0].branch_address[0])
            .andWhere('name', '=', info[0].content[j].brand)
        );
      }
      storeData = storeData.flat();

      for (const i in storeData) {
        if (info[0].content[i].width != undefined) {
          const calculate = Number(storeData[i].info[0].count)
              * Number(storeData[i].info[0].reminder)
            + Number(storeData[i].info[0].size);
          console.log(calculate, 'calculate');
          if (calculate < 0) {
            return 'count little than 0';
          } if (calculate == 0) {
            storeData[i].info[0].count = 0;
            storeData[i].info[0].size = 0;
            updateAndInsertInfo(info, i);
          } else {
            if (info[0].content[i].count == storeData[i].info[0].size) {
              // storeData[i].info[0].count = storeData[i].info[0].count - 1;
              storeData[i].info[0].size = 0;
              updateAndInsertInfo(info[0], i);
            }
            if (Number(info[0].content[i].size) == 0) {
              storeData[i].info[0].count = Math.floor(
                (calculate - info[0].content[i].count)
                  / Number(storeData[i].info[0].reminder)
              );
            } else {
              storeData[i].info[0].count = Math.floor(
                (calculate - info[0].content[i].count) / info[0].content[i].size
              );
            }

            if (storeData[i].info[0].size == 0) {
              storeData[i].info[0].size = (calculate - info[0].content[i].count)
                % storeData[i].info[0].reminder;
            } else {
              storeData[i].info[0].size = (calculate - info[0].content[i].count) % storeData[i].info[0].size;
            }

            console.log(
              storeData[i].info[0].size,
              'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'
            );

            updateAndInsertInfo(info[0], i);
          }
        } else {
          storeData[i].info[0].count = storeData[i].info[0].count - info[0].content[i].count;

          if (storeData[i].info[0].size <= 0) {
            return 'count little than 0';
          }
          updateAndInsertInfo(info[0], i);
        }
      }

      async function updateAndInsertInfo(data, i) {
        console.log(data.id, 'HJDJHAHFHAAFJHJAFJJHAF');
        console.log(storeData[i].info, 'INFO XUY EGO ZNAET INCH');
        const a = await pg('storage').update({ info: storeData[i].info }).where('id', '=', Number(data.product_id)).returning('*');

        delete data.content;
        delete data.id;
        if (data.sale != null) {
          data.sale_price = Math.floor(
            data.price - (Number(data.price) * Number(data.sale)) / 100
          );
        }
        console.log(a, 'UPDATED');
        return a;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default OrdersModel;
