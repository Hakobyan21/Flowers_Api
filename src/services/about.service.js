// Local Modules
import { AboutModel } from '../models';

export default class AboutService {
  static getAboutById(id) {
    return AboutModel.getAboutById(id);
  }

  static getAll() {
    return AboutModel.getAll();
  }

  static addDetails(info) {
    return AboutModel.addDetails(info);
  }

  static editDetails(info, id) {
    return AboutModel.editDetails(info, id);
  }

  static deleteDetails(id) {
    return AboutModel.deleteDetails(id);
  }
}
