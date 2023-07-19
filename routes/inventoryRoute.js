const express = require('express');
const inventoryRouter = express.Router();
const InventoryModel=require("../model/inventoryModel")


inventoryRouter.post('/add', async (req, res) => {
  try {
    const {
      carModel,
      odometerKMs,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
      image,
      des,
      oemId,
      userId,
    } = req.body;

    const newInventory = new InventoryModel({
      carModel,
      odometerKMs,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
      image,
      des,
      oemId,
      userId,
    });

    await newInventory.save();
    res.status(201).json({ msg: 'Inventory created successfully', newInventory });
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// http://localhost:5000/inventory?mileage=200
inventoryRouter.get('/', async (req, res) => {
    const { listPrice, color, mileage, userId } = req.query;
    try {
      let query = {};
      if (userId) {
        query.userId = userId;
      }
      let inventory = await InventoryModel.find(query).populate('oemId');
      if (listPrice) {
        const priceRegex = new RegExp(listPrice);
        inventory = inventory.filter(item => priceRegex.test(item.oemId.listPrice));
      }
      if (color) {
        const lowercaseColor = color.toLowerCase(); // Convert the input color to lowercase
        inventory = inventory.filter(item => {
          const colors = item.oemId.colors.map(c => c.toLowerCase()); // Convert the stored colors to lowercase
          return colors.includes(lowercaseColor);
        });
      }
      if (mileage) {
        const mileageRegex = new RegExp(mileage);
        inventory = inventory.filter(item => mileageRegex.test(item.oemId.mileage));
      }
      res.status(200).json({ data: inventory });
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  });

// 
inventoryRouter.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await InventoryModel.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Inventory entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// http://localhost:5000/inventory/edit/64b773a8d1ddf08c3af73785
inventoryRouter.patch('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      carModel,
      odometerKMs,
      majorScratches,
      originalPaint,
      accidentsReported,
      previousBuyers,
      registrationPlace,
      image,
      des,
      oemId,
      userId,
    } = req.body;

    const updatedInventory = await InventoryModel.findByIdAndUpdate(
      id,
      {
        carModel,
        odometerKMs,
        majorScratches,
        originalPaint,
        accidentsReported,
        previousBuyers,
        registrationPlace,
        image,
        des,
        oemId,
        userId,
      },
      { new: true }
    );

    res.status(200).json({ msg: 'Inventory entry updated successfully', updatedInventory });
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

module.exports = inventoryRouter;

// "carModel":"bmw1",
// "odometerKMs":10,
// "majorScratches":false,
// "originalPaint":false,
// "accidentsReported":0,
// "previousBuyers":3,
// "registrationPlace":"delhi",
// "image":"https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Hyundai-Grand-i10-Nios-200120231541.jpg&w=872&h=578&q=75&c=1",
// "des":["very good car"],
// "oemId":"64b768809efcc12b2b171428",
// "userId":"64b6cd915cc1577acee681b8"