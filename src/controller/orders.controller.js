// Local Modules
import { SuccessHandlerUtil } from '../utils';
import { OrdersService } from '../services';

export default class OrdersController {
  static async add(req, res, next) {
    try {
      const payload = req.body;

      const result = await OrdersService.add(payload);
      SuccessHandlerUtil.handleAdd(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async getPriceOrder(req, res, next) {
    try {
      const { price, users_id, branch_address } = req.body;
      console.log(req.body);
      const result = await OrdersService.getPriceOrder(price, users_id, branch_address);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;

      const result = await OrdersService.getById(id);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async editOrderStatus(req, res, next) {
    try {
      const { id, order_status } = req.query;
      const result = await OrdersService.editOrderStatus(id, order_status);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async getHistoryByBranch(req, res, next) {
    try {
      const { users_id, branch_address, order_status } = req.params;
      const result = await OrdersService.getHistoryByBranch(users_id, branch_address, order_status);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async getAllHistory(req, res, next) {
    try {
      const { users_id, order_status } = req.params;
      const result = await OrdersService.getAllHistory(users_id, order_status);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }
}
