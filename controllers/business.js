const {User, Business} = require("../models/index");
const getPath = require("../utils/filehandler");
const _ = require("lodash");

exports.details = async(req,res,next) => {
    try{
        const displayPicture = req.files[0];
        const data = req.body;
        const userId = req.params;

        const user = await User.findByPk(userId);
        if(!user) return res.status(404).json({code:404,message:"resturant not found",data: {}});

        const path = getPath(displayPicture);

        const business = await Business.create({
            businessType: data.businessType,
            tags: data.tags,
            location: data.location,
            gpsNumber: data.gpsNumber,
            city: data.city,
            district: data.district,
            region: data.region,
            salesTax: data.salesTax,
            userSlug: userId,
            displayPicture: process.env.base_url + path
        });
        if(!business) return res.status(400).json({code:400,message:"Business could not be created",data: {}});
        return res.status(201).json({code:201, message:"success",data: {}}); 
    }catch(err){
        next(err);
    }
}