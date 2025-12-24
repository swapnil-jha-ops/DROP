const express=require('express'); 
const app=express();
const path=require('path');

app.set('view engine','ejs');
app.set('views',path.join(process.cwd(),"views"));
app.use(express.urlencoded({ extended: true }));



const authRoutes = require("./routes/authRoutes");
app.use('/api/auth',authRoutes);




app.get('/',(req,res)=>{
    res.render("home_page"); 
})


app.listen(5500)