// pages/api/applications/user/[userId].js
import dbConnect from "../../../lib/dbConnect"; // Ensure this path is correct
import Application from "../../../models/Application"; // Make sure your Application model is in the correct path

export default async function handler(req, res) {
  const { userId } = req.query; // Extract userId from the URL

  if (req.method === "GET") {
    try {
      await dbConnect(); // Connect to the database

      // Find applications for the specific user
      const applications = await Application.find({ user: userId }).populate('job'); // Populate job details

      res.status(200).json(applications); // Return the applications as JSON
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
