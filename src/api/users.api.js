// NPM Modules
import express from 'express';

// Local Modules
import { UsersController } from '../controller';
// import UsersValidation from '../middlewares/validation/users.validation';
import { ImageUploadMiddleware } from '../middlewares/image-upload.middleware';
import { UsersValidationMiddleware } from '../middlewares/validation';
// import AuthMiddleware from '../auth/auth.middlware';

const router = express.Router();

// ADD BRanch_Adress

router.post(
  '/add/branch/:users_id',
  // UsersValidation.validateAddArgs,
  UsersController.addBranchAdress
);

router.post(
  '/add/',
  // UsersValidation.validateAddArgs,
  UsersController.add
);

router.delete('/:id', UsersController.delete);

router.get('/user/:usersId/:role/:id', UsersController.getUser);

router.get('/all', UsersController.getAllUsers);

router.put('/:id', UsersController.edit);

router.post(
  '/addPicture',
  // AuthMiddleware.authenticateFor(['admin']),
  ImageUploadMiddleware.upload(),
  UsersController.addPicture
);

router.get(
  '/:category/:companyName/:limit',
  UsersController.getCompanyDataWithLimit
);

router.post(
  '/sendMail',
  UsersValidationMiddleware.validateMailArgs,
  UsersController.sendMail
); // completed

// Storage Name
router.get('/storage/getStorageName', UsersController.getStorageName);

router.post(
  '/storage/addStorageName',
  // UsersValidation.validateAddArgs,
  UsersController.addStorageName
);

// Storage Info
router.post('/storage/addStorageInfo', UsersController.addStorageInfo);

router.get('/storage/getAllStorageInfo', UsersController.getAllStorageInfo);

router.put(
  '/storage/editStorageDetails/:id',
  UsersController.editStorageDetails
);

router.delete(
  '/storage/deleteStorageDetails/:id',
  UsersController.deleteStorageDetails
);
router.get(
  '/storage/getStorageInfoByCategory',
  UsersController.getStorageInfoByCategory
);

router.get(
  '/storage/getFullProduct/:users_id/:category_name/:branch_address',
  UsersController.getFullProduct
);


router.post('/storage/getPrice', UsersController.getPrice);

router.get('/getmincount/:users_id', UsersController.getmincount);
export default router;
