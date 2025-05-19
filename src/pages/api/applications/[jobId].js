// pages/api/applications.js
import { connectToDatabase } from "../../../../lib/mongodb";
import Application from "../../../../models/Application"; // Assuming Application is a model

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { applicant, job, resumeUrl } = req.body;
      const application = new Application({
        applicant,
        job,
        resumeUrl,
        status: "applied", // Set the default status as 'applied'
      });

      await application.save();
      res.status(201).json({ success: true, message: "Application submitted successfully" });
    } catch (error) {
      console.error("Error submitting application:", error);
      res.status(500).json({ error: "Failed to submit application" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
