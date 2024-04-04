import express from 'express';
import dotenv from 'dotenv';
const app = express();

dotenv.config();
const PORT = process.env.PORT;


//Root Route
app.get('/',(req,res) => {
    res.send('Hello World!!!');
})


app.listen(PORT,() => {
    console.log('Server is running on port ',PORT);
})