import slugify from 'slugify'
import productModel from '../models/productModel.js'
import orderModel from '../models/orderModel.js'
import fs from 'fs'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

function generateUniqueTransactionId() {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substr(2, 8);
    return `${timestamp}-${randomString}`
}
export const createProductController=async(req,res)=>{
    try {
        const {name,slug,description,price,sizes,category,quantity,shipping}=req.fields
        const {image1,image2,image3,image4} =req.files
        //validation
        switch(true){
            case !name:
                res.status(500).send({error:'Name is required'})
            case !description:
                    res.status(500).send({error:'Description is required'})
            case !price:
                res.status(500).send({error:'Price is required'})
            case !category:
                res.status(500).send({error:'Category is required'})
            case !quantity:
                res.status(500).send({error:'Quantity is required'})
        }
        
        const products=new productModel({...req.fields,slug:slugify(name)})
        if(sizes){
            products.sizes =JSON.parse(sizes)
        }
        if(image1){
            products.photo.image1.data =fs.readFileSync(image1.path)
            products.photo.image1.contentType =image1.type
        }
        if(image2){
            products.photo.image2.data =fs.readFileSync(image2.path)
            products.photo.image2.contentType =image2.type
        }
        if(image3){
            products.photo.image3.data =fs.readFileSync(image3.path)
            products.photo.image3.contentType =image3.type
        }
        if(image4){
            products.photo.image4.data =fs.readFileSync(image4.path)
            products.photo.image4.contentType =image4.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:'Product created successfully',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in creating product'
        })
    }
} 
export const getProductController= async(req,res)=>{
    try {
        const products=await productModel.find({}).populate('category').select('-photo').limit(15).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            totalCount:products.length,
            message:'All products',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            
            success:false,
            message:"Error in getting products",
            error:error.message
        })
    }
}
export const getRecommendedProductController= async(req,res)=>{
    try {
        const products=await productModel.find({}).populate('category').select('-photo').limit(15).sort({createdAt:1})
        res.status(200).send({
            success:true,
            totalCount:products.length,
            message:'All products',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            
            success:false,
            message:"Error in getting products",
            error:error.message
        })
    }
}
export const getSingleProductController=async(req,res)=>{
    try {
        const product= await productModel.findOne({slug:req.params.slug}).select('-photo').populate('category')
        res.status(200).send({
            success:true,
            message:'Single product fetched',
            product

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting single product',
            error
        })
    }
}
export const productPhoto1Controller=async(req,res)=>{
    try {
        const product=await productModel.findById(req.params.pid).select('photo')
        if(product.photo.image1.data){
            res.set('Content-type',product.photo.image1.contentType)
            return res.status(200).send(product.photo.image1.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting photo',
            error
        })
    }
}
export const productPhoto2Controller=async(req,res)=>{
    try {
        const product=await productModel.findById(req.params.pid).select('photo')
        if(product.photo.image2.data){
            res.set('Content-type',product.photo.image2.contentType)
            return res.status(200).send(product.photo.image2.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting photo',
            error
        })
    }
}
export const productPhoto3Controller=async(req,res)=>{
    try {
        const product=await productModel.findById(req.params.pid).select('photo')
        if(product.photo.image3.data){
            res.set('Content-type',product.photo.image3.contentType)
            return res.status(200).send(product.photo.image3.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting photo',
            error
        })
    }
}
export const productPhoto4Controller=async(req,res)=>{
    try {
        const product=await productModel.findById(req.params.pid).select('photo')
        if(product.photo.image4.data){
            res.set('Content-type',product.photo.image4.contentType)
            return res.status(200).send(product.photo.image4.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting photo',
            error
        })
    }
}
export const updateProductController=async(req,res)=>{
    try {
        const {name,slug,description,price,sizes,category,quantity,shipping}=req.fields
        const {image1,image2,image3,image4} =req.files
        //validation
        switch(true){
            case !name:
                res.status(500).send({error:'Name is required'})
            case !description:
                    res.status(500).send({error:'Description is required'})
            case !price:
                res.status(500).send({error:'Price is required'})
            case !category:
                res.status(500).send({error:'Category is required'})
            case !quantity:
                res.status(500).send({error:'Quantity is required'})   
            
        }
        
        const products=await productModel.findByIdAndUpdate(req.params.pid,{
            ...req.fields,slug:slugify(name)
        },{new:true})
         if(sizes){
            products.sizes =JSON.parse(sizes)
        }
        if(image1){
            products.photo.image1.data =fs.readFileSync(image1.path)
            products.photo.image1.contentType =image1.type
        }
        if(image2){
            products.photo.image2.data =fs.readFileSync(image2.path)
            products.photo.image2.contentType =image2.type
        }
        if(image3){
            products.photo.image3.data =fs.readFileSync(image3.path)
            products.photo.image3.contentType =image3.type
        }
        if(image4){
            products.photo.image4.data =fs.readFileSync(image4.path)
            products.photo.image4.contentType =image4.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:'Product updated successfully',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in updating product'
        })
    }
} 

export const deleteProductController =async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:'Product deleted Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while deleting product',
            error
        })
    }
}
export const productFilterController =async(req,res)=>{
    try {
        const {id,radio} =req.body
        let args ={}
        if(id){
            args.category=id
        }
        if(radio){
            args.price ={$gte:radio[0],$lte:radio[1]}
        }
        const products =await productModel.find(args)
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error while Filtering Products',
            error
        })
    }
}
export const productCountController =async(req,res)=>{
    try {
        const total=await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success:true,
            total
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in product count',
            error

        })
    }
}
export const productListController =async(req,res)=>{
    try {
        const perPage= 20
        const page =req.params.page ? req.params.page : 1
        const products=await productModel.find({}).select('-photo').skip((page-1)*perPage).limit(perPage).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'error in getting per page ctrl',
            error
        })
    }
}
export const searchProductController =async(req,res)=>{
    try {
        const {keyword} =req.params
        const results =await productModel.find({
            $or:[
                {name:{$regex:keyword,$options:'i'}},
                {description:{$regex:keyword,$options:'i'}}
            ]
        }).select('-photo')
        res.json(results)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in Search product api'
        })
    }
}
export const relatedProductontroller =async(req,res)=>{
    try {
        const {pid,cid}=req.params
        const products=await productModel.find({
            category:cid,
            _id:{$ne:pid}
        }).select('-photo').limit(15).populate("category")
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error while getting product',
            error
        })
    }
}

export const codPaymentController =async(req,res)=>{
    try {
        const { cart,user } = req.body;
         const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.count,
      0
    );

    const productsForOrder = [];

    for (const cartItem of cart) {
    const { _id,size,count,slug } = cartItem;

    const productForOrder = {
      product: _id,
      size,
      quantity: cartItem.count,
      slug
    };

    productsForOrder.push(productForOrder);
  }
        const order = new orderModel({
        products: productsForOrder, 
        payment:{
            type:'COD',
            total:totalPrice
        }, 
        buyer: user,
        status: 'Not processed',
        });
    
        await order.save();
    
        res.status(200).send({ success: true, message: 'Order placed successfully',order });
      } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: 'Error placing COD order',error });
      }
}

export const onlinePaymentController=async(req,res)=>{
   //server side
    try {
        const { orderId, customerId, email, amount, paymentMethod } = req.body;
        const transactionId = generateUniqueTransactionId()
        const totalPrice = amount.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
        
        const razorpay = new Razorpay({
            key_id: razorpayKeyId,
            key_secret: razorpayKeySecret,
          });
          const options = {
            amount: totalPrice * 100,
            currency: 'INR',
            receipt: orderId,
            payment_capture: 1,
            notes: {
              customer_id: customerId,
              email,
              transaction_id: transactionId,
            },
          };
          razorpay.orders.create(options, (err, order) => {
            if (err) {
              console.error('Error creating Razorpay order:', err);
              res.status(500).send({ success: false, message: 'Payment initiation failed' });
            } else {
              res.status(200).send({ success: true, order });
            }
          });
      } catch (error) {
        console.error('Error initiating payment:', error);
      }
}

export const verifyRazorpayPaymentController=async(req,res)=>{
    try {
          const { razorpay_order_id,razorpay_payment_id,razorpay_signature } = req.body;
            const sign = razorpay_order_id + '|' + razorpay_payment_id
            const expectedSign =crypto.createHmac('sha256',razorpayKeySecret)
            .update(sign.toString())
            .digest('hex')
            if(razorpay_signature === expectedSign){

      res.status(200).send({ success: true, message: 'Payment successful' });
    } else {
      res.status(400).send({ success: false, message: 'Payment failed or not verified' });
    }
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:'Internal server error'},error)
    }
}
export const setOnlinePaymentController =async(req,res)=>{
    try {
        const { cart,user } = req.body;
     const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.count,
      0
    );

    const productsForOrder = [];

      for (const cartItem of cart) {
      const { _id,size,count,slug} = cartItem;

      const productForOrder = {
        product: _id,
        size,
        quantity: cartItem.count,
        slug
      };

      productsForOrder.push(productForOrder);
    }
        const order = new orderModel({
        products:productsForOrder, 
        payment:{
            type:'Online',
            total:totalPrice
        }, 
        buyer: user,
        status: 'Not processed',
        });
    
        await order.save();
    
        res.status(200).send({ success: true, message: 'Order saved successfully',order });
      } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: 'Error saving online order',error });
      }
}