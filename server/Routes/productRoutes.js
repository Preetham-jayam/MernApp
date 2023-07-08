import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
  } from '../controllers/productController.js';
const router=express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import {protect,admin} from '../middleware/authMiddleware.js';
router.route('/').get(getProducts).post(protect,admin,createProduct);
router.route('/:id').get(getProductById).put(protect,admin,updateProduct);



export default router;