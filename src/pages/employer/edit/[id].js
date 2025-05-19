// pages/employer/edit/[id].js

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function EditJob() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;  // Get the job ID from the URL

  const [job, setJob] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    category: "",
  });
  const [error, setError] = useState("");

  // Only fetch the job if the ID is available
  useEffect(() => {
    if (!id) return; // Wait for the job ID to be available

    const fetchJob = async () => {
      try {
        console.log("Fetching job with ID:", id);  // Log the ID to verify
        const res = await fetch(`/api/jobs/${id}`);  // Correct URL with job ID
        const data = await res.json();

        if (data.job) {
          setJob(data.job);  // Set the job details to the form
        } else {
          setError("Failed to load job");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        setError("Failed to load job");
      }
    };

    fetchJob();
  }, [id]);  // Re-run when the `id` is available

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedJob = { ...job };

    console.log("Updating job with ID:", id);  // Log job ID to check

    // Send a PUT request to update the job
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PUT",  // Using PUT to update the job
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedJob),
    });

    const data = await res.json();
    if (data.success) {
      router.push("/employer/dashboard");  // Redirect to dashboard after successful update
    } else {
      setError(data.error || "Failed to update job");
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Job</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Job Title */}
        <input
          type="text"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        {/* Job Description */}
        <textarea
          value={job.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        {/* Company */}
        <input
          type="text"
          value={job.company}
          onChange={(e) => setJob({ ...job, company: e.target.value })}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        {/* Location */}
        <input
          type="text"
          value={job.location}
          onChange={(e) => setJob({ ...job, location: e.target.value })}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        {/* Salary */}
        <input
          type="number"
          value={job.salary}
          onChange={(e) => setJob({ ...job, salary: e.target.value })}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        {/* Category */}
        <select
          value={job.category}
          onChange={(e) => setJob({ ...job, category: e.target.value })}
          className="w-full p-2 mb-3 border rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
        </select>

        {/* Submit Button */}
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Update Job
        </button>
      </form>
    </div>
  );
}
