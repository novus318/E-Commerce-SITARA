import slugify from 'slugify'
import productModel from '../models/productModel.js'
import fs from 'fs'
export const createProductController=async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping}=req.fields
        const {photo} =req.files
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
            case !photo && photo.size > 4000000:
                    res.status(500).send({error:'Photo is required and should be less than 4mb'})
        }
        
        const products=new productModel({...req.fields,slug:slugify(name)})
        if(photo){
            products.photo.data =fs.readFileSync(photo.path)
            products.photo.contentType =photo.type
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
export const productPhotoController=async(req,res)=>{
    try {
        const product=await productModel.findById(req.params.pid).select('photo')
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data)
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
        const {name,slug,description,price,category,quantity,shipping}=req.fields
        const {photo} =req.files
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
            case !photo && photo > 4000000:
                    res.status(500).send({error:'Photo is required and should be less than 4mb'})
        }
        
        const products=await productModel.findByIdAndUpdate(req.params.pid,{
            ...req.fields,slug:slugify(name)
        },{new:true})
        if(photo){
            products.photo.data =fs.readFileSync(photo.path)
            products.photo.contentType =photo.type
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