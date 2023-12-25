// Local Modules
import { ProductService } from '../services';
import { SuccessHandlerUtil } from '../utils';

export default class ProductController {
  // user
  static async getAllProductsUser(req, res, next) {
    try {
      const { product_status, limit } = req.query;
      const result = await ProductService.getAllProductsUser(product_status, limit);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async getProductsByIdUser(req, res, next) {
    try {
      const { id } = req.params;
      const result = await ProductService.getProductsByIdUser(id);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async getAllStatuses(req, res, next) {
    try {
      const result = await ProductService.getAllStatuses();
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async search(req, res, next) {
    try {
      const { word } = req.params;
      const result = await ProductService.search(word);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async getAllFilteredByPrice(req, res, next) {
    try {
      const { minPrice, maxPrice } = req.params;
      const result = await ProductService.getAllFilteredByPrice(minPrice, maxPrice);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async getAllByCompany(req, res, next) {
    try {
      const { users_id, product_status } = req.params;
      const result = await ProductService.getAllByCompany(users_id, product_status);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategoryName(req, res, next) {
    try {
      const { id } = req.params;
      const result = await ProductService.deleteCategoryName(id);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  // admin
  static async getAllProducts(req, res, next) {
    try {
      const { users_id, product_status } = req.params;
      const result = await ProductService.getAllProducts(users_id, product_status);
      console.log(result);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { user_id } = req.params;
      const result = await ProductService.getProductById(user_id);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async getProductByLimit(req, res, next) {
    try {
      const { limit, user_id } = req.params;
      const result = await ProductService.getProductByLimit(limit, user_id);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    try {
      const info = req.body;
      const result = await ProductService.addProduct(info);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const info = req.body;
      const { id } = req.params;
      console.log(info, 'info');
      console.log(id, 'id');
      const result = await ProductService.updateProduct(info, id);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const result = await ProductService.deleteProduct(id);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  // Category Name
  static async addCategoryName(req, res, next) {
    try {
      const { name, user_id } = req.body;
      console.log(user_id);
      const result = await ProductService.addCategoryName(name, user_id);
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryName(req, res, next) {
    try {
      const { user_id } = req.params;
      const result = await ProductService.getCategoryName(user_id);
      console.log('====================================');
      console.log(result);
      console.log('====================================');
      SuccessHandlerUtil.handleList(res, next, result);
    } catch (error) {
      next(error);
    }
  }
}
