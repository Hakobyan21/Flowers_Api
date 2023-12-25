// Local Modules
import { AboutService, Service } from '../services';
import { SuccessHandlerUtil } from '../utils';

export default class AboutController {
  // Mail sender
  static async sendMail(req, res, next) {
    try {
      const { name, email, text } = req.body;

      await Service.sendMail(name, email, text);
      SuccessHandlerUtil.handleList(res, next, { succes: true });
    } catch (error) {
      next(error);
    }
  }

  // About methods
  static async getAboutById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await AboutService.getAboutById(id);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const result = await AboutService.getAll();
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async addDetails(req, res, next) {
    try {
      const info = req.body;
      const result = await AboutService.addDetails(info);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async editDetails(req, res, next) {
    try {
      const info = req.body;
      const { id } = req.params;
      const result = await AboutService.editDetails(info, id);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteDetails(req, res, next) {
    try {
      const { id } = req.params;
      const result = await AboutService.deleteDetails(id);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }
}
