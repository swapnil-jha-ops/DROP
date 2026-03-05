const express=require('express'); 
const app=express();
const path=require('path');
const connectDB= require('./config/db');
const cookieParser=require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

connectDB();    

app.set('view engine','ejs');
app.set('views',path.join(process.cwd(),"views"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.path}`);
    next();
});

app.use('/api/auth',require("./routes/authRoutes"));
app.use('/api/task',require('./routes/taskRoutes'))
app.use('/api/user',require("./routes/userRoutes"));

const PORT=process.env.PORT||3000;

app.get('/',(req,res)=>{
    res.render("home_page"); 
})

app.get('/test', (req, res) => {
    res.json({ message: 'Server is working' });
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});