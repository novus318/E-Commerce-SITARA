import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
 products:[{
  type:mongoose.ObjectId,
  ref: 'product',
}],
payment:[],
buyer:{
  type:mongoose.ObjectId,
  ref:'user'

},
status:{
  type:String,
  default:'Not process',
  enum:['Not processed','Processing','Ready to Ship','Order Shipped','Order Delevered','Order Cancelled']
}
},{timestamps:true});

export default mongoose.model("order", orderSchema);