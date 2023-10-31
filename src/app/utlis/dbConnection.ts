import mongoose from  "mongoose"
const URI = process.env;
const dbConnection =async(): Promise<void>=>{
    try{
        if(!URI){
            console.log("No URL Found ")
        }
        await mongoose.connect('mongodb+srv://rafayelrabbi:rafayelrabbi@cluster0.elm9b.mongodb.net/cap');
        console.log("Connected")
    }
    catch{
        console.log("Error connecting")
    }

}
export {dbConnection}