import { SlidesModel } from '../models';

export default class SideService {
  static async getAllSlides() {
    return SlidesModel.getAllSlides();
  }

  static addSlide(payload) {
    return SlidesModel.addSlide(payload);
  }

  static updateSlide(id, payload) {
    return SlidesModel.updateSlide(id, payload);
  }

  static deleteSlide(id) {
    return SlidesModel.deleteSlide(id);
  }
}
