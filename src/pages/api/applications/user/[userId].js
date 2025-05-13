// pages/api/applications/user/[userId].js
import dbConnect from "../../../../../lib/mongodb"; // Ensure this path is correct
import Application from "../../../../models/Application"; // Make sure your Application model is in the correct path

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method === "GET") {
    try {
      await dbConnect(); // Connect to the database
      console.log(`Fetching applications for user ID: ${userId}`); // Log userId for debugging

      // Find applications for the specific user
      const applications = await Application.find({ user: userId }).populate('job');
      
      console.log("Fetched Applications:", applications); // Log the applications to verify the data

      res.status(200).json(applications); // Return the applications as JSON
    } catch (error) {
      console.error("Failed to fetch applications:", error); // Log detailed error
      res.status(500).json({ message: "Server error", error: error.message }); // Include error message in response
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}