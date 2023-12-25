// NPM Modules
import { Model } from 'objection';

class AboutModel extends Model {
  static get idColumn() {
    return 'id';
  }

  static get tableName() {
    return 'about';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        position: { type: 'string', minLength: 1, maxLength: 255 },
        logo: { type: 'string', minLength: 1, maxLength: 255 },
        text: { type: 'string', minLength: 1, maxLength: 255 },
        title: { type: 'string', minLength: 1, maxLength: 255 }
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

  // Methods

  // Bouquets
  static getAboutById(id) {
    return AboutModel.query().select('*').where('id', '=', id).orderBy('id');
  }

  static getAll() {
    return AboutModel.query().select('*').orderBy('id');
  }

  static addDetails(info) {
    return AboutModel.query().insert(info).returning('*');
  }

  static editDetails(info, id) {
    return AboutModel.query()
      .update(info)
      .where('id', '=', id)
      .returning('*');
  }

  static deleteDetails(id) {
    return AboutModel.query().del().where('id', '=', id).returning('*');
  }
}

export default AboutModel;
