import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc Create new Order
//@route Post /api/orders
//@access Private

const addOrderItems= asyncHandler(async (req,res)=>{
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice,
    shippingPrice

  }=req.body;

  if(orderItems && orderItems.length===0){
    res.status(400);
    throw new Error('No Order Items');
  }
  else{
    const order = new Order({
        orderItems: orderItems.map((x) => ({
          ...x,
          product: x._id,
          _id: undefined,
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
  
      const createdOrder = await order.save();
  
      res.status(201).json(createdOrder);
    }

  
});

// @desc get logged in user orders
//@route Get /api/orders/myorders
//@access Private

const getMyOrders= asyncHandler(async (req,res)=>{
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
 });

 // @desc get Order by id
//@route Get /api/orders/:id
//@access Private

const getOrderById= asyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
      );
    
      if (order) {
        res.json(order);
      } else {
        res.status(404);
        throw new Error('Order not found');
      }
 });

 // @desc Update Order to paid
//@route PUT /api/orders/:id/pay
//@access Private

const updateOrderToPaid= asyncHandler(async (req,res)=>{
   const order=await Order.findById(req.params.id);
   if(order){
    order.isPaid=true;
    order.paidAt=Date.now();
    order.paymentResult={
      id:req.body.id,
      status:req.body.status,
      update_time:req.body.update_time,
      email_address:req.body.email_address,  //These fields come from PayPal
    };

    const updatedOrder=await order.save();
    res.status(200).json(updatedOrder);
   } else{
    res.status(404);
    throw new Error("Order Not Found");
   }
 });

 // @desc Update Order to delivered
//@route PUT /api/orders/:id/deliver
//@access Private/Admin

const updateOrderToDelivered= asyncHandler(async (req,res)=>{
    res.send('update order to delivered');
 });

 // @desc Get All Orders
//@route Get /api/orders
//@access Private/Admin

const getAllOrders= asyncHandler(async (req,res)=>{
   const orders=await Order.find({}).populate('user','id name');
   res.status(200).json(orders);
 });

 export  {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders
 };