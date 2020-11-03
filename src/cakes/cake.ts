//import * as mongoose from "mongoose";
import mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose);

const uri: string = "mongodb://127.0.0.1:27017/db_test_cakes";

mongoose.set('useFindAndModify', false);

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully Connected! to the Database");
  }
});

export interface CakeInterface extends mongoose.Document {
  //name: string;
  //price: number;
  flavors: string;
}

export const CakeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  price: { type: Float, required: true},
  flavors: {type: [], required: true}
});

const Cake = mongoose.model<CakeInterface>("Cake", CakeSchema);
export default Cake;