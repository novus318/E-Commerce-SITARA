import mongoose from "mongoose";
const bannerSchema =new mongoose.Schema({
    banner:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true})
export default mongoose.model('banners',bannerSchema)