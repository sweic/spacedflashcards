import express, {Express} from 'express';
import router from './routes/routes'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
import {PrismaClient} from '@prisma/client'
import {Server} from 'socket.io'
import { createServer } from "http";
import { initWebSocket } from "./ws/init";
import errors from './middlewares/error-handler'
const prisma = new PrismaClient()

const app: Express = express();


app.use(cors({origin: 'http://localhost:3000', credentials: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(router)

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

const uri = `mongodb+srv://sweic:${process.env.MONGOOSE_PW}@cluster0.5kjfn.mongodb.net/Spaced?retryWrites=true&w=majority`;
app.use(errors)

mongoose.connect(uri).then(async () => {
    httpServer.listen(5000, async () => {
        console.log('The application is listening on port 5000!');
        initWebSocket(io)
    })
  
})

