import express from 'express';
import {
    getProducts,
    getProductById,
  } from '../controllers/productController.js';
const router=express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);


export default router;