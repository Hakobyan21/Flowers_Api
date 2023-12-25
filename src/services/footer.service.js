import { FootersModel } from '../models';

export default class FooterService {
  static getAllFootersByKey(key) {
    return FootersModel.getAllFootersByKey(key);
  }

  static updateFooterById(key, id, payload) {
    return FootersModel.updateFooterById(key, id, payload);
  }
}
