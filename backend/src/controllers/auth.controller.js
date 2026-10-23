import usermodel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { Config } from "../config/config.js"; 

async function sendtokenresponse(user,res,meesage) {
        
        const token = createToken(user)

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

function createToken(user) {
        return jwt.sign({
                id: user._id
        },Config.JWT_SECRET,{
                expiresIn:"7d"
        })
}


export async function registeruser(req,res){    
       
        const {email,password,fullname,contact,isSeller} = req.body

      try{
           const conditions = [{email}]
           if (contact) conditions.push({contact})

           const isuseralreadyexist = await usermodel.findOne({
                $or: conditions
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
                contact,
                role :isSeller? "seller" : "buyer"
        })

        await sendtokenresponse(user,res,"user registered succesfully")

      } catch(error){
        console.log(error)
        return res.status(500).json({
                meesage:"server error"
        })
      }


}



export async function loginuser(req,res) {

        const {email,password} = req.body


        try{
                const user = await usermodel.findOne({email})

                if(!user){
                        return res.status(400).json({
                                meesage:"user not found"
                        })
                }

                const ispasswordvalid = await user.comparepassword(password)

                if(!ispasswordvalid){
                        return res.status(400).json({
                                meesage:"invalid password"
                        })
                }

                await sendtokenresponse(user,res,"user logged in succesfully")

        }
        catch(error){
                console.log(error)
                return res.status(500).json({
                        meesage:"server error"
                })
        }
}


export async function googlecallback(req,res){
        try {
                const email = req.user?.emails?.[0]?.value
                const fullname = req.user?.displayName || req.user?.name?.givenName || "User"
                const googleId = req.user?.id

                if(!email){
                        return res.status(400).json({
                                meesage:"Google account did not provide an email address"
                        })
                }

                let user = await usermodel.findOne({email})

                if(!user){
                        user = await usermodel.create({
                                email,
                                fullname,
                                googleId,
                                role: "buyer"
                        })
                } else if (!user.googleId && googleId) {
                        user.googleId = googleId
                        await user.save()
                }

                res.cookie("token",createToken(user))
                return res.redirect("http://localhost:5173")
        } catch(error) {
                console.log(error)
                return res.redirect("http://localhost:5173/login?error=auth_failed")
        }

}   


export const getMe = async (req, res) => {
    const user = req.user;

    res.status(200).json({
        message: "User fetched successfully",
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    })
}