// NPM Modules
import { Model } from 'objection';

class ContactModel extends Model {
  static get idColumn() {
    return 'id';
  }

  static get tableName() {
    return 'contact';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'integer' },
        link: { type: 'string', minLength: 1, maxLength: 255 },
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

  // Contact Methods
  static getAll() {
    return ContactModel.query().select('*').orderBy('id');
  }

  static editDetails(info, id) {
    return ContactModel.query()
      .update(info)
      .where('id', '=', id)
      .returning('*');
  }
}

export default ContactModel;
