import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
 products:[{
   product: {
      type: mongoose.ObjectId,
      ref: 'products',
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    slug: {
      type: String,
      required: true,
    }
}],
payment:{},
buyer:{
  type:mongoose.ObjectId,
  ref:'users'

},
status:{
  type:String,
  default:'Not process',
  enum:['Not processed','Processing','Ready to Ship','Order Shipped','Order Delevered','Order Cancelled']
}
},{timestamps:true});

export default mongoose.model("order", orderSchema);