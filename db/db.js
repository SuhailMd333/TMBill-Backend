const mongoose = require('mongoose');   
const db = async () => {
    try {
        const response =  await mongoose.connect(`${process.env.MONGODB_URI || "mongodb+srv://suhailshk333:pYKuQOHexm5PJHYE@cluster0.ltgwj4r.mongodb.net/task-management"}`)
        if(response){
            console.log('Database connected successfully');
        }
    } catch (error) {
        console.log(error);
    }
}

db();