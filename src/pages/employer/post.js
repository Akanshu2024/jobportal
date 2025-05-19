import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function PostJob() {
  const { data: session } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState(""); // Success state to show confirmation message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous messages
    console.log("Form submitted. Clearing previous messages.");
    setError("");
    setSuccess("");

    // Validate required fields
    if (!title || !description || !company || !location || !salary || !category) {
      console.log("Error: All fields are required.");
      setError("All fields are required");
      return;
    }

    const jobData = {
      title,
      description,
      company,
      location,
      salary,
      category,
      employer: session.id,
    };

    console.log("Posting job with data:", jobData);

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    });

    const data = await res.json();
    
    console.log("Response from backend:", data);

    if (data.job) {
      console.log("Job posted successfully:", data.job);
      setSuccess("Job posted successfully!");
      router.push("/employer/dashboard"); // Redirect after success
    } else {
      console.log("Error in posting job:", data.error || "Unknown error");
      setError(data.error || "Failed to post job");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Post a Job</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => {
            console.log("Title changed to:", e.target.value);
            setTitle(e.target.value);
          }}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => {
            console.log("Description changed to:", e.target.value);
            setDescription(e.target.value);
          }}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => {
            console.log("Company name changed to:", e.target.value);
            setCompany(e.target.value);
          }}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => {
            console.log("Location changed to:", e.target.value);
            setLocation(e.target.value);
          }}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => {
            console.log("Salary changed to:", e.target.value);
            setSalary(e.target.value);
          }}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <select
          value={category}
          onChange={(e) => {
            console.log("Category changed to:", e.target.value);
            setCategory(e.target.value);
          }}
          className="w-full p-2 mb-3 border rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
        </select>

        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Post Job
        </button>
      </form>
    </div>
  );
}
