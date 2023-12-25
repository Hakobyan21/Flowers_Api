// NPM Modules
import { Model } from 'objection';

class FootersModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'footers'; }

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
  static getAllFootersByKey(key) {
    if (key === 'no') {
      return FootersModel.query().select('*').whereNull('icond').orderBy('id');
    }
    return FootersModel.query().select('*').whereNotNull('icond').orderBy('id');
  }

  static updateFooterById(key, id, payload) {
    if (key === 'no') {
      return FootersModel.query().update(payload).whereNull('icond').andWhere('id', '=', id)
        .returning('*');
    }
    return FootersModel.query().update(payload).whereNotNull('icond').andWhere('id', '=', id)
      .returning('*');
  }
}

export default FootersModel;
