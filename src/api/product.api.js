// NPM Modules
import express from 'express';

// Local Modules
import { ProductController } from '../controller';
// import AuthMiddleware from '../auth/auth.middlware';

const router = express.Router();

// In The User
router.get('/user/allproduct', ProductController.getAllProductsUser);
router.get('/user/:id', ProductController.getProductsByIdUser);
router.get('/user/productstatus/all', ProductController.getAllStatuses);
router.get('/user/search/:word', ProductController.search);
router.get('/user/filteredbyprice/all/:minPrice/:maxPrice',
  ProductController.getAllFilteredByPrice);
router.get('/all/:users_id/:product_status', ProductController.getAllByCompany);

// In THe Admin
router.get('/allproduct/:users_id/:product_status', ProductController.getAllProducts);
router.get('/products/:user_id', ProductController.getProductById);
router.get('/product/:user_id/:limit', ProductController.getProductByLimit);
router.post('/products',
  // AuthMiddleware.authenticateFor(['admin']),
  ProductController.addProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

// Category Name
router.get('/getCategoryName/:user_id', ProductController.getCategoryName);
router.post('/addCategoryName', ProductController.addCategoryName);
router.delete('/deleteCategoryName/:id', ProductController.deleteCategoryName);

export default router;
