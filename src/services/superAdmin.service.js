// Local Modules
import {
  SuperAdminModel
} from '../models';

export default class SuperAdminServices {
  static async getAllProducts() {
    return SuperAdminModel.getAllProducts();
  }
}
