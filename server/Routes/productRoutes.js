import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts
  } from '../controllers/productController.js';
const router=express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import {protect,admin} from '../middleware/authMiddleware.js';
router.route('/').get(getProducts).post(protect,admin,createProduct);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect,createProductReview);


export default router;