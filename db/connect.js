import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();
const my_conexion = JSON.parse(process.env.MY_CONEXION)

export default async function conexion(){
    try {
        const uri = `mongodb+srv://${my_conexion.user}:${my_conexion.password}@cluster0.oj8cvn0.mongodb.net/${my_conexion.dbName}`;
        let options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        let client = await new MongoClient(uri, options).connect();
        return client.db();
    } catch (error) {
        
    }
}