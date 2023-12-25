// Local Modules
import { ContactModel } from '../models';

export default class ContactService {
  static getAll() {
    return ContactModel.getAll();
  }

  static editDetails(info, id) {
    return ContactModel.editDetails(info, id);
  }
}
