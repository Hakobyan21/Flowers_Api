// NPM Modules
import { Model } from 'objection';

class SlidesModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'slides'; }

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

  static getAllSlides() {
    return SlidesModel.query().select('*').orderBy('id');
  }

  static addSlide(payload) {
    return SlidesModel.query().insert(payload);
  }

  static updateSlide(id, payload) {
    return SlidesModel.query().update(payload).where('id', '=', id).returning('*');
  }

  static deleteSlide(id) {
    return SlidesModel.query().del().where('id', '=', id).returning('*');
  }
}

export default SlidesModel;
