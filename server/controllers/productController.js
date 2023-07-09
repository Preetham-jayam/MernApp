import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc Fetch all Products
//@route Get /api/products
//@access Public

const getProducts= asyncHandler(async (req,res)=>{
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Product.countDocuments();
  const products = await Product.find()
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch a product
//@route Get /api/products/:id
//@access Public
const getProductById= asyncHandler(async (req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
       return res.json(product);
    }
    else{ 
        res.status(404);
        throw new Error('Resource not found');
    }
});

// @desc Create a Products
//@route Post /api/products
//@access Private

const createProduct= asyncHandler(async (req,res)=>{
    const product=new Product({
        name:'Sample Name',
        price:0,
        user:req.user._id,
        image:'/image/sample.jpg',
        brand:'Sample Brand',
        countInStock:0,
        numReviews:0,
        description:'Sample Description',
    })

    const createdProd=await product.save();
    res.status(201).json(createdProd);
});

// @desc Update Products
//@route PUT /api/products/:id
//@access private

const updateProduct= asyncHandler(async (req,res)=>{
    const {name,price,description,image,brand,countInStock}=req.body;
    const product=await Product.findById(req.params.id);

    if(product){
        product.name=name;
        product.price=price;
        product.description=description;
        product.image=image;
        product.brand=brand;
        product.countInStock=countInStock;

        const updatedprod=await product.save();
        res.json(updatedprod);

    } else{
        res.status(404);
        throw new Error('Product not found');
    }
   
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
  
    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });

  // @desc   Create a new Review
// @route   POST /api/products/:id/reviews
// @access  Private/Admin
const createProductReview = asyncHandler(async (req, res) => {
    const {rating,comment}=req.body;
    const product = await Product.findById(req.params.id);
  
    if (product) {
       const alreadyreviewed=product.reviews.find(
        (review)=> review.user.toString()===req.user._id.toSreing()
       );
       if(alreadyreviewed){
        res.status(400);
        throw new Error("Product Already Reviewed");
       }

       const review={
        name:req.user.name,
        rating:Number(rating),
        comment,
        user:req.user._id,
       };

       product.reviews.push(review);
       product.rating= product.reviews.reduce((acc,review)=> acc+review.rating,0)/product.reviews.length;

       await product.save();
       res.status(201).json({message:'Review Added'});


    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });






export  {createProductReview,updateProduct,getProducts,getProductById,createProduct,deleteProduct};



