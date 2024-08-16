import express from 'express'
import cors from "cors"
import connectDB from './Database/connection.js'
import router from './routes/router.js';
import CookieParser from 'cookie-parser'
import {config} from 'dotenv';

config({
    path: './.env'
})

const app = express()

connectDB().then(()=>{console.log("Database connected")}).catch((err)=>{console.error(err)})

app.use(CookieParser()) 
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/user', router)

app.get('/', (req,res)=>{
    res.send("Server is running")
})

app.listen(8080, ()=>{
    console.log('Port started at 8080')
})