const mongoose = require('mongoose');
const oemSpecsModel = require('./oemSpecModel');
// const oemSpecsModel = require('./OemSpecs')
const {UsersModel}=require("./userModel")


const inventorySchema = new mongoose.Schema({
  carModel: String,
  odometerKMs: Number,
  majorScratches: Boolean,
  originalPaint: Boolean,
  accidentsReported: Number,
  previousBuyers: Number,
  registrationPlace: String,
  image: String,
  des:Array,
  oemId: { type: mongoose.Schema.Types.ObjectId, ref: oemSpecsModel },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: UsersModel},
});

const InventoryModel = mongoose.model('Inventory', inventorySchema);

module.exports = InventoryModel;