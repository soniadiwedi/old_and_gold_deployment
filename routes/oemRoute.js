const express = require('express');
const oemSpecsModel = require('../model/oemSpecModel');

const oemRouter = express.Router();


oemRouter.post('/add', async (req, res) => {
    const { model, year, listPrice, colors, mileage, power, maxSpeed } = req.body;
  
    try {
      const newOem = new oemSpecsModel({
        model,
        year,
        listPrice,
        colors,
        mileage,
        power,
        maxSpeed,
      });
  
      await newOem.save();
      res.status(201).json({ msg: 'OEM specs added successfully', newOem });
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  });

oemRouter.get('/count', async (req, res) => {
  try {
    const count = await oemSpecsModel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

// http://localhost:5000/oem/search?model=bmw1&year=2023
oemRouter.get('/search', async (req, res) => {
    const { model, year } = req.query;
  
    try {
      let query = {};
  
      if (model && year) {
        query = { model, year };
      } else if (model) {
        query = { model };
      } else if (year) {
        query = { year };
      } else {
        return res.status(400).json({ msg: 'Please provide either model or year parameter' });
      }
  
      const oemSpecs = await oemSpecsModel.findOne(query);
  
      if (!oemSpecs) {
        return res.status(404).json({ msg: 'OEM specs not found' });
      }
  
      res.status(200).json({ data: oemSpecs });
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  });
  


  
  module.exports = oemRouter;

//   "model":"maruti",
//   "year":2020,
//   "listPrice":50000,
//   "colors":["blue"],
//   "mileage":200,
//   "power":3,
//   "maxSpeed":60