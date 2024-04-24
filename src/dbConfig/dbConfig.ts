import mongoose from "mongoose"

const dbConnect = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        // Mongodb connecting sucessfully
        connection.on("connected", () => {
            console.log("Connected to the database sucessfully")
        })

        //Database connection failed
        connection.on("error", () => {
            console.log("Connection failed! Please try again")
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong")
        console.error(error)
    }
}
export default dbConnect
