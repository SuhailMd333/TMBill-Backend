const express = require('express');
const app = express();
require('dotenv').config();
require('./db/db')
const cors  = require('cors')
app.use(cors()) 
app.use(express.json())
const UserAPI = require('./routes/user')
const TaskAPI = require('./routes/task')



// app.use('/',(req,res) => {
//     res.send('Hello World!');

// })

app.use('/api/v1', UserAPI)
app.use('/api/v2', TaskAPI)

// const PORT = 5000 

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    
});