// pages/api/jobs/[id].js
import { connectToDatabase } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query; // The ID is passed as a query parameter
  const db = await connectToDatabase();

  // GET method: Fetch job details by _id
  if (req.method === "GET") {
    try {
      const job = await db.collection("jobs").findOne({ _id: new ObjectId(id) });

      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }

      res.status(200).json({ job });
    } catch (error) {
      console.error("Error fetching job:", error);
      res.status(500).json({ error: "Failed to fetch job" });
    }
  }

  // PUT method: Update the job by _id
  else if (req.method === "PUT") {
    try {
      const { title, description, company, location, salary, category } = req.body;
      const updatedJob = {
        title,
        description,
        company,
        location,
        salary,
        category,
        updated_at: new Date(),
      };

      const result = await db.collection("jobs").updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedJob }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Job not found" });
      }

      res.status(200).json({ success: true, message: "Job updated successfully" });
    } catch (error) {
      console.error("Error updating job:", error);
      res.status(500).json({ error: "Failed to update job" });
    }
  }

  // DELETE method: Delete job by _id
  else if (req.method === "DELETE") {
    try {
      // Delete the job from the collection
      const result = await db.collection("jobs").deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Job not found" });
      }

      res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
      console.error("Error deleting job:", error);
      res.status(500).json({ error: "Failed to delete job" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
