// pages/api/auth/signup.js

import User from '../../../models/User'; // Import the User model
import { hash } from 'bcryptjs'; // For hashing passwords
import { connectToDatabase } from '../../../../lib/mongodb'; 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      // Connect to the database
      const db = await connectToDatabase();

      // Check if the user already exists
      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await hash(password, 10);

      // Create the user in the database
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: 'user', // Default role is user, can be modified later
      });

      // Save the user to MongoDB
      await db.collection('users').insertOne(newUser);

      return res.status(201).json({ success: true, message: "User created successfully!" });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
