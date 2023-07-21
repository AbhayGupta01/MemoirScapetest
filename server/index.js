import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/post.js';
import userRoutes from './routes/user.js';


const app = express();
dotenv.config();


const PORT = process.env.PORT || 5000;
//img size
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
//cors need to be above routes
app.use(cors())
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

// app.listen(PORT, function () {
//   console.log(`CORS-enabled web server listening on port ${PORT}`)
// })

//every route inside postRoutes is gonna start  with /posts
app.use('/posts', postRoutes);
app.use('/user', userRoutes);



app.get('/', (req,res) => {
  res.send('Hello Memories Api, the backend is now running')
});


//for errors
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT, ()=>console.log(`server running on port: ${PORT}`)))
.catch((err)=>console.log(err.message));
//for err puprposes
mongoose.set('useFindAndModify',false);
