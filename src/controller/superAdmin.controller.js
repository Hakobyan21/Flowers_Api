// Local Modules
import { superAdminServices } from '../services';
import { SuccessHandlerUtil } from '../utils';

export default class UsersController {
  static async getAllProducts(req, res, next) {
    try {
      const result = await superAdminServices.getAllProducts();

      SuccessHandlerUtil.handleAdd(res, next, result);
    } catch (error) {
      next(error);
    }
  }
}
