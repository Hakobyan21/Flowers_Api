import { Model } from 'objection';

class UsersStorageModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'storage_name'; }

  $beforeInsert() {
    const date = new Date();
    this.created_at = date;
  }

  $beforeUpdate() {
    const date = new Date();
    this.updated_at = date;
  }

  static async getStorageName() {
    return UsersStorageModel.query().select('*');
  }

  static async addStorageName(payload) {
    return UsersStorageModel.query().insert(payload);
  }
}

export default UsersStorageModel;
