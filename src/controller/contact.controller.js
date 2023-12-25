// Local Modules
import { ContactService } from '../services';
import { SuccessHandlerUtil } from '../utils';

export default class ContactController {
  // Contact methods
  static async getAll(req, res, next) {
    try {
      const result = await ContactService.getAll();
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async editDetails(req, res, next) {
    try {
      const info = req.body;
      const { id } = req.params;
      const result = await ContactService.editDetails(info, id);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }
}
