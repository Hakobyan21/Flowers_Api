// Local Modules
import { SlideService } from '../services';
import { SuccessHandlerUtil } from '../utils';

export default class SlideController {
  static async getAllSlides(req, res, next) {
    try {
      const result = await SlideService.getAllSlides();
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async addSlide(req, res, next) {
    try {
      const payload = req.body;
      const result = await SlideService.addSlide(payload);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async updateSlide(req, res, next) {
    try {
      const { id } = req.params;
      const payload = req.body;
      const result = await SlideService.updateSlide(id, payload);
      SuccessHandlerUtil.handleAdd(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteSlide(req, res, next) {
    try {
      const { id } = req.params;
      const result = await SlideService.deleteSlide(id);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }
}
