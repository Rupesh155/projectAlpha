let express=   require('express');
const connectDB = require('./config/db');
let signUpRoute=require('./router/user')
let loginUpRoute=require('./router/login')
let forgetRouter=require('./router/forget')
let resetRouter=require('./router/reset')
let coursesRouter=require('./router/couseRouter')
let paymentRouter=require('./router/payment')
let chatBot=require('./router/chatbot')

 let cors=       require('cors')


let app=  express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
connectDB()
app.use('/api',signUpRoute)
app.use('/api',loginUpRoute)
app.use('/api',forgetRouter) 
app.use('/api',resetRouter) 
app.use('/api',resetRouter) 
app.use('/api',coursesRouter) 
app.use('/api',paymentRouter) 
app.use('/api',chatBot) 



app.listen(3000,()=>{
    console.log('server running 3000');
    
})