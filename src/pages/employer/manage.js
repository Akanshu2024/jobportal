// pages/employer/manage.js

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ManageJobs() {
  const { data: session } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session || session.role !== "employer") {
      router.push("/auth/login");
      return;
    }

    const fetchJobs = async () => {
      try {
        const res = await fetch(`/api/jobs?employer=${session.id}`);
        const data = await res.json();
        setJobs(data.jobs || []);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch jobs.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, [session, router]);

const handleDelete = async (jobId) => {
  if (window.confirm("Are you sure you want to delete this job?")) {
    try {
      console.log("Sending DELETE request for job ID:", jobId); // Log the job ID
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log("Response from backend:", data); // Log the response

      if (res.status === 200) {
        // Job deleted successfully, remove it from the list
        setJobs(jobs.filter((job) => job._id !== jobId));
        alert(data.message);
      } else {
        alert(data.error || "Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job.");
    }
  }
};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Your Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-3 px-6 text-left">Job Title</th>
              <th className="py-3 px-6 text-left">Company</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="border-b">
                <td className="py-3 px-6">{job.title}</td>
                <td className="py-3 px-6">{job.company}</td>
                <td className="py-3 px-6">{job.location}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => router.push(`/employer/edit/${job._id}`)}
                    className="mr-2 text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)} // Delete job
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
