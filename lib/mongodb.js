// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// const options = {};

// let client;
// let db;

// export async function connectToDatabase() {
//   if (db) return db;

//   client = new MongoClient(uri, options);
//   await client.connect();
//   db = client.db('jobboard'); // <--- Make sure this matches the database name you created
//   return db;
// }

// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // MongoDB URI from environment variables
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let db;

export async function connectToDatabase() {
  if (db) return db; // Return the existing database connection if it already exists

  try {
    // Create a new MongoClient instance and connect to the database
    client = new MongoClient(uri, options);
    await client.connect();
    
    // Access the database, ensuring the name matches what you have created in MongoDB (e.g., 'jobboard')
    db = client.db('jobboard');
    console.log("Connected to MongoDB database: jobboard");

    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
