const follower = require("../models/follower");
const signUp = require("../models/signUp");
const userProfile = require("../models/userProfile");
const Profile = require("../models/userProfile");

exports.getProfile=async(req,res)=>{
try { 
   
    const params = req.params.userId
    const profileId=params.split("-1")[0]
    const adminId=params.split("-1")[1]
    var Follow = false;
const profile = await Profile.findById(profileId);
const Follows = await follower.findOne({$and:[{profileId:profileId},{adminId:adminId}]});
if(Follows){
    Follow=true;
}

if(!profile){
    return res.status(200).json({success:false,error:'profile not found'});
}
return res.json({success:true,Profile:profile,Follows:Follow})
} catch (error) {
    return res.status(200).json({success:false,error:error.message});

}

}
exports.createProfile=async(req,res)=>{
    try {
        const exit = await Profile.findOne({userId:req.body.userId});
        if(exit){
      
            return res.status(200).json({success:true,Profile:exit,message:"user profile areadry exits"});
        }
       
        const newProfile = await Profile(req.body);
        await newProfile.save();
        console.log("saved")
        return res.json({success:true,Profile:newProfile,message:'profile created successfully'})
    } catch (error) {
        return res.json({success:false,error:error.message})
    }
}

exports.findAdmin=async(req,res)=>{
    try {
        const user = await signUp.findById(req.params.id);
        if(!user){
            return res.status(404).json({success:false,error:"user not found"});
        }
        return res.status(200).json({success:true,admin:user})
    } catch (error) {
        return res.status(500).json({success:false,error:error.message});

    }
}
exports.removeFollow=async(req,res)=>{
    try {
        const condition1 = { adminId:req.body.userId };
        const condition2 = { profileId: req.body.profileId }; 
       
        const exit = await follower.find({ $and: [condition1, condition2] });
       
       
        const profile = await userProfile.findById(req.body.profileId);
        
        const adminProfile = await userProfile.findOne({userId:req.body.userId});
        if(!profile||!adminProfile||exit.length==0){
           
            return res.status(200).json({success:false,error:'profile not found'});
        }
        
        let newfollower=parseInt(profile.follower);
        newfollower=newfollower-1;
        await userProfile.findByIdAndUpdate(req.body.profileId,{follower:newfollower});
        
        await follower.deleteOne({ $and: [condition1, condition2] });
     
       return res.json({success:true,message:"follow successful"});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false,error:error.message});

    }
}
exports.addFollower=async(req,res)=>{
    try {
      
        const profile = await userProfile.findById(req.body.profileId);
        const adminProfile = await userProfile.findOne({userId:req.body.userId});
        if(!profile||!adminProfile){
            return res.status(404).json({success:false,error:'profile not found'});
        }
       
        let newfollower=parseInt(profile.follower);
        let inc=newfollower+1;
        await userProfile.findByIdAndUpdate(req.body.profileId,{follower:inc});
       
        await follower.create({
            profileId:req.body.profileId,
            adminId:req.body.userId
        });
      
        res.json({success:true,message:"follow successful"});
    } catch (error) {
        return res.status(500).json({success:false,error:error.message});

    }
}

exports.checkfollow=async(req,res)=>{
    try {
        const condition1 = { adminId:req.body.userId };
        const condition2 = { profileId: req.body.profileId }; 
       
        const exit = await follower.find({ $and: [condition1, condition2] });
        if(exit.length==0){
            return res.status(200).json({success:true,follow:false,message:'not follow'});
        }
        return res.status(200).json({success:true,follow:true,message:'follow each other'})
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false,error:error.message});
    }
}