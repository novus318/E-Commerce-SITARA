import bannerModel from '../models/bannerModel.js'
import fs from 'fs'

export const createBannerController=async(req,res)=>{
    try {
        const {banner}=req.files
        //validate
        if(!banner){
            res.status(500).send({error:'Banner is required'})
        }
        const banners=await new bannerModel({
            banner:{
                data :fs.readFileSync(banner.path),
                contentType :banner.type
            }
        }).save()
        res.status(201).send({
            success:true,
            message:'banner created successfully',
            banners
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in creating banner'
        })
    }
}
export const updateBannerController=async(req,res)=>{
    try {
        const {banner}=req.files
        //validate
        if(!banner){
            res.status(500).send({error:'Banner is required'})
        }
        const banners=await bannerModel.findByIdAndUpdate(req.params.pid,{
            banner:{
                data :fs.readFileSync(banner.path),
                contentType :banner.type
            }
        },{new:true})
        res.status(201).send({
            success:true,
            message:'banner Updated successfully',
            banners
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Updating banner'
        })
    }
}
export const getBannerController =async(req,res)=>{
    try {
        const banners=await bannerModel.findById(req.params.pid)
        if(banners.banner){
            res.set('Content-type',banners.banner.contentType)
            return res.status(200).send(banners.banner.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting banners",
            error:error.message
        })
    }
}
export const getBannersController =async(req,res)=>{
    try {
        const banners=await bannerModel.find({})
        res.status(200).send({
            success:true,
            totalCount:banners.length,
            message:'All Banners',
            banners
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting banners",
            error:error.message
        })
    }
}