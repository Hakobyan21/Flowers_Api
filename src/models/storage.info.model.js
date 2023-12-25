/* eslint-disable guard-for-in */
import { Model } from 'objection';
import knex from 'knex';

import knexConfigs from '../../knex.configs';

const pg = knex(knexConfigs.development);

class StorageInfoModel extends Model {
  static get idColumn() {
    return 'id';
  }

  static get tableName() {
    return 'storage';
  }

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

  static async getAllStorageInfo(users_id, branch_address) {
    return StorageInfoModel.query()
      .select('*')
      .where('users_id', '=', users_id)
      .andWhere('branch_address', '=', branch_address);
  }

  static async getStorageInfoByCategory(
    users_id,
    branch_address,
    category_name
  ) {
    return StorageInfoModel.query()
      .select('*')
      .where('users_id', '=', users_id)
      .andWhere('branch_address', '=', branch_address)
      .andWhere('category_name', '=', category_name);
  }

  static async addStorageInfo(payload) {
  
    try {
      if (payload.id) {
        const result = await StorageInfoModel.query().select("*").where("id", "=", payload.id);
        if (result.length > 0) {
          return await StorageInfoModel.query().where("id", "=", payload.id).update(payload).returning('*');
        }
      }
      return await StorageInfoModel.query().insert(payload).returning('*');
    } catch (error) {
      console.error("Error in addStorageInfo:", error);
      throw error;
    }
  }
  
  static async getPrice(info) {
    console.log(info);
    let price = 0;
    for (const i in info.content) {
      const res = await StorageInfoModel.query()
        .select('*')
        .where('users_id', '=', info.users_id)
        .andWhere('branch_address', '=', info.branch_address[0])
        .andWhere('name', '=', info.content[i].brand);

      if (
        ((res[0].info[0].reminder == undefined || res[0].info[0].reminder == false)
            && +res[0].info[0].count < +info.content[i].count)
          || +res[0].info[0].count * +res[0].info[0].reminder + +res[0].info[0].size < +info.content[i].count
      ) {
        return 'նշված քանակը գերազանցում է պահեստում առկա քանակը';
      }

      price
          += Number(info.content[i].count) * Number(res[0].info[0].exportPrice);
    }

    return price;
  }

  static async editStorageDetails(info, id) {
    return StorageInfoModel.query()
      .update(info)
      .where('id', '=', id)
      .returning('*');
  }

  static async deleteStorageDetails(id) {
    return StorageInfoModel.query()
      .del()
      .where('id', '=', id)
      .returning('*');
  }

  static async getFullProduct(users_id,category_name,branch_address) {
    return StorageInfoModel.query()
      .select('*')
      .where('users_id', '=', users_id)
      .andWhere('category_name','=',category_name)
      .andWhere('branch_address','<>',branch_address)
      .orderBy('id')
  }

  

  // static async getmincount(users_id) {
  //   // console.log(users_id, 'mod');
  //   const data = await StorageInfoModel.query().select('*').where('users_id', '=', users_id);
  //   const filteredData = await data.map(async (item) => {
  //     console.log(item.info);
  //     const infoitem = await item.info;
  //     const pop = infoitem.map(async (el) => {
  //       if (el.reminder == undefined || el.reminder == false) {
  //         console.log(55555555555);
  //         if (Number(el.minCount) >= Number(el.count)) {
  //           console.log(item, 5555555);
  //           return item;
  //         }
  //       } else {
  //         const inf = (el.reminder * el.count);
  //         if (inf > el.minCount) {
  //           return item;
  //         }
  //       }
  //     });
  //     console.log(pop,'pop');
  //     return await  pop
  //   });
  //   console.log(filteredData, 'test');
  //   return filteredData;
  // }
  static async getmincount(users_id) {
    const data = await StorageInfoModel.query().select('*').where('users_id', '=', users_id);
    const filteredData = await Promise.all(data.map(async (item) => {
      const infoitem = await item.info;
      const pop = await Promise.all(infoitem.map(async (el) => {
        if (el.reminder === undefined || el.reminder === false) {
          if (Number(el.minCount) >= Number(el.count)) {
            return item;
          }
        } else {
          const inf = +el.reminder * +el.count;
          if (inf < +el.minCount + +el.size) {
            return item;
          }
        }
      }));
      // Filter out undefined elements and return non-empty arrays
      return pop.filter((el) => el !== undefined && el !== null);
    }));
    // Flatten the nested arrays to a single array
    const flattenedData = filteredData.flat();
    console.log(flattenedData, 'test');
    return flattenedData;
  }
}

export default StorageInfoModel;
