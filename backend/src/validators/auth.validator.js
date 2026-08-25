import {body,validationResult} from "express-validator"


function validateRequest(req,res,next){
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    next()
}



export const validateregisteruser = [
    body("email")
     .isEmail().withMessage("invalid email format"),
    
     body("contact")
     .notEmpty().withMessage("contact is required"),
    
     body("fullname")
     .notEmpty().withMessage("full name is required"),
    
     body("password")
     .isLength({min:6}).withMessage("password must contain 6 character"),

     validateRequest
]