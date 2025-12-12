const express=require('express'); 
const app=express();
const path=require('path');

app.set('view engine','ejs');
app.set('views',path.join(process.cwd(),"views"));
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.render("home_page"); 
})
app.get('/register', (req,res)=>{
    res.render('register')
})
app.post('/register', (req,res)=>{

})

app.post('/login',(req,res)=>{
    let{email,password}=req.body;
})

app.get('/login',(req,res)=>{
    res.render("login"); 
})

app.listen(5500)