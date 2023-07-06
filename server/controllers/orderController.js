import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc Create new Order
//@route Post /api/orders
//@access Private

const addOrderItems= asyncHandler(async (req,res)=>{
   res.send('add Order Items');
});

// @desc get logged in user orders
//@route Get /api/orders/myorders
//@access Private

const getMyOrders= asyncHandler(async (req,res)=>{
    res.send('get my orders');
 });

 // @desc get Order by id
//@route Get /api/orders/:id
//@access Private

const getOrderById= asyncHandler(async (req,res)=>{
    res.send('get order by id');
 });

 // @desc Update Order to paid
//@route Get /api/orders/:id/pay
//@access Private

const updateOrderToPaid= asyncHandler(async (req,res)=>{
    res.send('update order to paid');
 });

 // @desc Update Order to delivered
//@route Get /api/orders/:id/deliver
//@access Private/Admin

const updateOrderToDelivered= asyncHandler(async (req,res)=>{
    res.send('update order to delivered');
 });

 // @desc Get All Orders
//@route Get /api/orders
//@access Private/Admin

const getAllOrders= asyncHandler(async (req,res)=>{
    res.send('get all orders');
 });

 export  {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders
 };