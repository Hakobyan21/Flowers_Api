// Local Modules
import { FooterService } from '../services';
import { SuccessHandlerUtil } from '../utils';

export default class FooterController {
  static async getAllFootersByKey(req, res, next) {
    try {
      const { key } = req.params;
      const result = await FooterService.getAllFootersByKey(key);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async updateFooterById(req, res, next) {
    try {
      const { key, id } = req.params;
      const payload = req.body;
      const result = await FooterService.updateFooterById(key, id, payload);
      SuccessHandlerUtil.handleAdd(res, next, result);
    } catch (error) {
      next(error);
    }
  }
}
