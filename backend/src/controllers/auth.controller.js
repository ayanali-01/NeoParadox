import usermodel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { Config } from "../config/config.js"; 

async function sendtokenresponse(user,res,meesage) {
        
        const token = jwt.sign({
                id: user._id
        },Config.JWT_SECRET,{
                expiresIn:"7d"
        })

        res.cookie("token",token)

        res.status(200).json({
                meesage,
                user:{
                     id:user._id,
                     email:user.email,
                     fullname:user.fullname,
                     contact:user.contact,
                     role:user.role   
                }
        })

}


export async function registeruser(req,res){    
       
        const {email,password,fullname,contact} = req.body

      try{
           const isuseralreadyexist = await usermodel.findOne({
                $or:[{email},{contact}]
        })

        if(isuseralreadyexist){
              return res.status(400).json({
                meesage:"user already existed with this email or contact"
            })
        }

        const user = await usermodel.create({
                email,
                password,
                fullname,
                contact
        })

        await sendtokenresponse(user,res,"user registered succesfully")

        





      } catch(error){
        console.log(error)
        return res.status(500).json({
                meesage:"server error"
        })
      }


}