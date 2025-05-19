// pages/candidate/apply/[jobId].js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function ApplyJob() {
  const router = useRouter();
  const { jobId } = router.query; // Get the jobId from the URL
  const { data: session } = useSession();

  const [resumeUrl, setResumeUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeUrl) {
      setError("Resume URL is required.");
      return;
    }

    const applicationData = {
      applicant: session.id,
      job: jobId,
      resumeUrl,
    };

    const res = await fetch(`/api/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    });

    const data = await res.json();
    if (data.success) {
      setSuccess("Application submitted successfully!");
      router.push("/candidate/jobs"); // Redirect to job listings after submission
    } else {
      setError(data.error || "Failed to submit application");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Apply for Job</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

        {/* Resume URL */}
        <input
          type="url"
          placeholder="Enter Resume URL"
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Apply
        </button>
      </form>
    </div>
  );
}
