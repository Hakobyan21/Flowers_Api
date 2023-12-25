// Local Modules
import {
  ProductModel, ProductStatusModel
} from '../models';

export default class ProductService {
  // user
  static getAllProductsUser(product_status, limit) {
    return ProductModel.getAllProductsUser(product_status, limit);
  }

  static getProductsByIdUser(id) {
    return ProductModel.getProductsByIdUser(id);
  }

  static getAllStatuses() {
    return ProductStatusModel.getAllStatuses();
  }

  static search(word) {
    return ProductModel.search(word);
  }

  static getAllFilteredByPrice(minPrice, maxPrice) {
    return ProductModel.getAllFilteredByPrice(minPrice, maxPrice);
  }

  static getAllByCompany(users_id, product_status) {
    return ProductModel.getAllByCompany(users_id, product_status);
  }

  // Admin
  static getProductById(user_id) {
    return ProductModel.getProductById(user_id);
  }

  static getAllProducts(users_id, product_status) {
    return ProductModel.getAllProducts(users_id, product_status);
  }

  static getProductByLimit(limit, user_id) {
    return ProductModel.getProductByLimit(limit, user_id);
  }

  static addProduct(info) {
    return ProductModel.addProduct(info);
  }

  static updateProduct(info, id) {
    return ProductModel.updateProduct(info, id);
  }

  static deleteProduct(id) {
    return ProductModel.deleteProduct(id);
  }

  //  CategoryName
  static addCategoryName(name, users_id) {
    return ProductStatusModel.addName(name, users_id);
  }

  static getCategoryName(user_id) {
    return ProductStatusModel.getName(user_id);
  }

  static deleteCategoryName(id) {
    return ProductStatusModel.deleteCategoryName(id);
  }
}
