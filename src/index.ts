import express from 'express';
import { publicRouter, privateRouter } from './app/routes/index';
import cors from 'cors';
import './app/models'
import connectDB from './app/config/database/connectDb';
import cookieParser from 'cookie-parser';
import { responseInterceptor } from './app/middlewares/responseInterceptor';
import { ErrorInterceptor } from './app/middlewares/errorInterceptor';
import { authMiddleware } from './app/middlewares/authMiddleware';
const app = express();
const PORT = 4000;
const whiteList = ['http://localhost:3000']


const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
//middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
//response intercetor
app.use(responseInterceptor)

//routing 
app.use('/api/v1', publicRouter)
app.use('/api/v1', authMiddleware, privateRouter)
//error interceptor
app.use(ErrorInterceptor)

// ✅ Health check
app.get('/health', (req, res) => {
  console.log('hitting....')
  res.send({ message: 'Working...' });

});

// ✅ Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Could not start server:', err);
    process.exit(1);
  }
};

startServer();