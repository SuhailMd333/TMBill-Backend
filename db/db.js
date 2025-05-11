const mongoose = require('mongoose');   
const db = async () => {
    try {
        const response =  await mongoose.connect(`${process.env.MONGODB_URI}`)
        if(response){
            console.log('Database connected successfully');
        }
    } catch (error) {
        console.log(error);
    }
}

db();