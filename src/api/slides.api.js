// NPM Modules
import express from 'express';

// Local Modules
import { SlideController } from '../controller';
import SlidesValidationMiddleware from '../middlewares/validation/slides.validation';
// import AuthMiddleware from '../auth/auth.middlware';

const router = express.Router();

router.get('/all',
  SlideController.getAllSlides);

router.post('/add', SlidesValidationMiddleware.validateAddArgs, SlideController.addSlide);

router.put('/:id', SlideController.updateSlide);

router.delete('/:id', SlideController.deleteSlide);

export default router;
