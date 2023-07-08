import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc Fetch all Products
//@route Get /api/products
//@access Public

const getProducts= asyncHandler(async (req,res)=>{
    const products=await Product.find({});
    res.json(products);
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



export  {updateProduct,getProducts,getProductById,createProduct,deleteProduct};



