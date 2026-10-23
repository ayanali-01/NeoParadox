import mongoose from "mongoose"
import bcrypt from  "bcrypt"


const userSchema = new mongoose.Schema({
    email:{type: String, required:true, unique:true},
    password:{type: String, required:false},
    contact :{type: String, required:false},
    fullname:{type: String, required:true},
    googleId:{type: String},
    role:{
        type:String,
        enum:["buyer","seller"],
        default:"buyer"
    }
})

userSchema.pre("save", async function(){
    if(!this.isModified("password") || !this.password) 
        return
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
})

userSchema.methods.comparepassword = async function(password){
    if(!this.password) return false
    return bcrypt.compare(password,this.password)
}



const usermodel = mongoose.model("user",userSchema)


export default usermodel