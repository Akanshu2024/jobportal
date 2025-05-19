// pages/api/jobs/index.js
import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(req, res) {
  const db = await connectToDatabase();

  if (req.method === "GET") {
    try {
      const jobs = await db.collection("jobs").find({}).toArray();
      res.status(200).json({ jobs });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jobs." });
    }
  } else if (req.method === "POST") {
    try {
      const { title, description, company, location, salary } = req.body;
      const job = await db.collection("jobs").insertOne({
        title,
        description,
        company,
        location,
        salary,
        date_posted: new Date(),
      });
      res.status(201).json({ job });
    } catch (error) {
      res.status(500).json({ error: "Failed to create job." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
