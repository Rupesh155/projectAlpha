const User = require("../models/userModel");
const router = require("./user");
let jwt =require('jsonwebtoken')
let bcrypt=require('bcrypt')
router.post('/login', async(req,res)=>{
    let loginData=req.body
     let data=    await User.findOne({email:loginData.email})
     console.log(data ,"datata");
     console.log(loginData.passWord,'loginData');
     
     
     if(data){
                 let validPass=     await bcrypt.compare(data.passWord,loginData.passWord)
                 console.log(validPass,"validPASSSSSS");
                 
                 if(validPass){
                       let token=   jwt.sign({id:data._id,email:data.email,role:data.role},'jdsbfiuwhfiuwhfwuif',{expiresIn:'1h'})
                       console.log(token);
                       
                   return res.status(200).send(token)
                 }
                 else{
                    res.send('InvalidPssssss')
                 }
     }
     else{
        res.send('pahle account create kroooo')
     }


}
)

module.exports=router