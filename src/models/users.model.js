// NPM Modules
import { Model } from 'objection';
import knex from 'knex';
import bCrypt from 'bcryptjs';
import { ErrorsUtil, CryptoUtil } from '../utils';

import knexConfigs from '../../knex.configs';

const pg = knex(knexConfigs.development);

const { InputValidationError } = ErrorsUtil;

class UsersModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'users'; }

  $beforeInsert() {
    const date = new Date();
    this.created_at = date;
  }

  $beforeUpdate() {
    const date = new Date();
    this.updated_at = date;
  }

  // Methods

  static async addBranchAddress(payload, users_id) {
    try {
      if (users_id === undefined) {
        throw new Error('User ID is undefined. Cannot update branch address.');
      } else

      // console.log(result, 55);
      // return result;
      if (payload.role === 'branchadmin') {
        await UsersModel.query()
          .findById(users_id) // Assuming users_id uniquely identifies the user
          .patch({
            branch_address:
              UsersModel.raw('array_append(branch_address, ?)', [payload.branch_address[0]])
          });
        const xt = payload.password;

        const newPassword = CryptoUtil.createHash(xt);
        delete payload.password;
        payload.password = newPassword;
        const result = await UsersModel.query().where('users_id', users_id).insert(payload);
        return result;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  // static async addBranchAddress(payload, users_id) {
  //   // eslint-disable-next-line no-useless-catch
  //   try {
  //     if (users_id === undefined) {
  //       throw new Error('User ID is undefined. Cannot update branch address.');
  //     } else if (payload.role === 'branchadmin') {
  //         const result = await UsersModel.query()
  //           .where('users_id', users_id)
  //           .andWhere('role', 'admin')
  //           .update({
  //             branch_address: UsersModel
  //               .raw('array_append(branch_address, ?)', [payload.branch_address])
  //           });
  //         console.log(result, 55);
  //         return result;

  //       const xt = payload.password;
  //       // console.log(xt);
  //       const newPassword = CryptoUtil.createHash(xt);
  //       delete payload.password;
  //       payload.password = newPassword;
  //       const result = await UsersModel.query().where('users_id', users_id).insert(payload);
  //       return result;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  //   // Throw the error if it's something other than a unique constraint violation
  // }

  static async create(payload) {
    // if(payload.admin)
    const user = await UsersModel.query().select('*').where('adminname', '=', payload.adminname);
    if (user.length === 0) {
      return UsersModel.query().insert(payload);
    }
    throw new InputValidationError('User with this adminname already exist');
  }

  static async edit(id, payload) {
    const user = await UsersModel.query()
      .select('password') 
      .where('id', '=', id);
    if (payload.oldPassword && payload.newPassword) {
      if (!CryptoUtil.isValidPassword(payload.oldPassword, user[0].password)) {
        throw new InputValidationError('Invalid old password');
      }
      const newPassword = await bCrypt.hash(payload.newPassword, 10);
      delete payload.newPassword;
      delete payload.oldPassword;
      payload.password = newPassword;
    }
    return UsersModel.query()
      .update(payload)
      .where('id', '=', id)
      .returning('*');
  }

  static async findByUsersId(usersId, role, id) {
    const userArray = await UsersModel.query().select('*')
      .where('users_id', '=', usersId)
      .andWhere('role', '=', role)
      .andWhere('id', '=', id);
    const user = userArray[0];
    return user;
  }

  static async findByAdminName(adminname) {
    // Replace this with the adminname from your request body
    // console.log(adminname, 'adminname');
    try {
      const user = await UsersModel.query().findOne({ adminname });
      if (user) {
        console.log('User found:', user);
        return await user;
      }
      console.log('User not found');
    } catch (error) {
      console.error('Error:', error);

      return error;
    }
    // console.log(adminname);
    // const x = UsersModel.query().findOne({ adminname });
    // console.log(x, 1615151);
  }

  static getAllUsers() {
    return UsersModel.query().select('*').where('role', '=', 'admin').orderBy('id');
  }

  static delete(id) {
    return UsersModel.query().del().where('id', '=', id).returning('*');
  }

  static async getCompanyDataWithLimit(category, companyName, limit) {
    return pg('products').select('*').where('product_status', '=', category)
      .where('companyName', '=', companyName)
      .orderBy('id', 'desc')
      .limit(limit);
  }
}

export default UsersModel;
