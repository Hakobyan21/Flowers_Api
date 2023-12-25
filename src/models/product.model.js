// NPM Modules
import { Model } from 'objection';
import ProductStatusModel from './ProductStatusModel.model';

class ProductModel extends Model {
  static get idColumn() {
    return 'id';
  }

  static get tableName() {
    return 'products';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        // Define your schema properties here.
      }
    };
  }

  static get relationMappings() {
    return {
      productStatus: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductStatusModel,
        join: {
          from: 'products.product_status_id',
          to: 'product_statuses.id'
        }
      }
    };
  }

  $beforeInsert() {
    const date = new Date();
    this.created_at = date;
  }

  $beforeUpdate() {
    const date = new Date();
    this.updated_at = date;
  }

  // user
  static async getAllProductsUser(product_status, limit) {
    return ProductModel.query()
      .select('*')
      .where('product_status', '=', product_status)
      .limit(limit);
  }

  static async getProductsByIdUser(id) {
    return ProductModel.query().select('*').where('id', '=', id);
  }

  static async search(word) {
    return ProductModel.query()
      .where('flowerName', 'ilike', `%${word}%`)
      .orWhere('companyName', 'ilike', `%${word}%`)
      .orWhere('companyName', 'ilike', `%${word}`);
  }

  static async getAllFilteredByPrice(minPrice, maxPrice) {
    const query = ProductModel.query().where('price', '>=', minPrice);

    if (maxPrice > 0 && +maxPrice >= +minPrice) {
      query.andWhere('price', '<=', maxPrice);
    } else {
      query.andWhere(
        'price',
        '<=',
        ProductModel.query()
          .select('price')
          .orderBy('price', 'desc')
          .first()
          .then((row) => row.price)
      );
    }

    return query;
  }

  static async getAllByCompany(users_id, product_status) {
    return ProductModel.query()
      .select(
        'id',
        'companyName',
        'description',
        'sale_price',
        'price',
        'availability',
        'categoryName',
        'size',
        'sale',
        'picture',
        'flowerName',
        'users_id'
      )
      .where('users_id', users_id)
      .where('product_status', product_status)
      .orderBy('users_id');
  }

  // admin
  static async getAllProducts(users_id, product_status) {
    return ProductModel.query()
      .select('*')
      .where('users_id', '=', users_id)
      .andWhere('product_status', '=', product_status)
      .orderBy('id');
  }

  static async getProductById(user_id) {
    return ProductModel.query()
      .select('*')
      .where('users_id', '=', user_id)
      .orderBy('id');
  }

  static async getProductByLimit(limit, user_id) {
    return ProductModel.query()
      .select('*')
      .orderBy('id', 'desc')
      .where('users_id', '=', user_id)
      .limit(limit);
  }

  static async addProduct(info) {
    if (info.id) {
      delete info.id;
    }
    return ProductModel.query()
      .insert(info)
      .returning('*');
  }

  // static async addProduct(info) {

  //   try {
  //     console.log(info, 'Frontic ekac data');
  //     let storeData = [];
  //     for (const j in info.content) {
  //       storeData.push(
  //         await pg('storage')
  //           .select('info')
  //           .where('users_id', '=', info.users_id)
  //           .andWhere('branch_address', '=', info.branch_address[0])
  //           .andWhere('name', '=', info.content[j].brand)
  //       );
  //     }
  //     storeData = storeData.flat();

  //     for (const i in storeData) {
  //       if (info.content[i].width != undefined) {
  //         const calculate = Number(storeData[i].info[0].count)
  //             * Number(storeData[i].info[0].reminder)
  //           + Number(storeData[i].info[0].size);
  //         console.log(calculate, 'calculate');
  //         if (calculate < 0) {
  //           return 'count little than 0';
  //         } if (calculate == 0) {
  //           storeData[i].info[0].count = 0;
  //           storeData[i].info[0].size = 0;
  //           updateAndInsertInfo(info, i);
  //         } else {
  //           if (info.content[i].count == storeData[i].info[0].size) {
  //             // storeData[i].info[0].count = storeData[i].info[0].count - 1;
  //             storeData[i].info[0].size = 0;
  //             updateAndInsertInfo(info, i);
  //           }
  //           if (Number(info.content[i].size) == 0) {
  //             storeData[i].info[0].count = Math.floor(
  //               (calculate - info.content[i].count)
  //                 / Number(storeData[i].info[0].reminder)
  //             );
  //           } else {
  //             storeData[i].info[0].count = Math.floor(
  //               (calculate - info.content[i].count) / info.content[i].size
  //             );
  //           }

  //           if (storeData[i].info[0].size == 0) {
  //             storeData[i].info[0].size = (calculate - info.content[i].count)
  //               % storeData[i].info[0].reminder;
  //           } else {
  //             storeData[i].info[0].size = (calculate - info.content[i].count) % storeData[i].info[0].size;
  //           }

  //           console.log(
  //             storeData[i].info[0].size,
  //             'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'
  //           );

  //           updateAndInsertInfo(info, i);
  //         }
  //       } else {
  //         storeData[i].info[0].count = storeData[i].info[0].count - info.content[i].count;

  //         if (storeData[i].info[0].size <= 0) {
  //           return 'count little than 0';
  //         }
  //         updateAndInsertInfo(info, i);
  //       }
  //     }

  //     async function updateAndInsertInfo(data, i) {
  //       const a = await pg('storage')
  //         .update({ info: storeData[i].info })
  //         .where('id', '=', Number(data.id))
  //         .returning('*');

  //       delete data.content;
  //       delete data.id;
  //       if (data.sale != null) {
  //         data.sale_price = Math.floor(
  //           data.price - (Number(data.price) * Number(data.sale)) / 100
  //         );
  //       }
  //       return ProductModel.query().insert(data).returning('*');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  static async updateProduct(info, id) {
    // console.log(Number(data.price))
    // console.log(Number(data.sale));

    return ProductModel.query()
      .update(info)
      .where('id', '=', id)
      .returning('*');
  }

  static async deleteProduct(id) {
    return ProductModel.query().del().where('id', '=', id).returning('*');
  }
}

export default ProductModel;
