// pages/candidate/jobs.js
import { useState, useEffect } from "react";
import JobCard from "../../components/JobCard"; // Assuming you already have a JobCard component
import { useRouter } from "next/router";

export default function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    salary: "",
    category: "",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch("/api/jobs"); // You can use a more specific API route to filter jobs
      const data = await res.json();
      setJobs(data.jobs || []);
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      (job.title && job.title.toLowerCase().includes(filters.search.toLowerCase())) ||
      (job.company && job.company.toLowerCase().includes(filters.search.toLowerCase()));

    const matchesSalary = !filters.salary || job.salary >= Number(filters.salary);
    const matchesCategory = !filters.category || job.category === filters.category;

    return matchesSearch && matchesSalary && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">Job Listings</h1>

      {/* Search Bar */}
      <div className="w-full max-w-4xl mb-6">
        <input
          type="text"
          placeholder="Search by title, company, or location"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="w-full max-w-4xl mb-6">
        {/* Salary Filter */}
        <input
          type="number"
          placeholder="Min Salary"
          value={filters.salary}
          onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
          className="p-2 border rounded w-full"
        />
      </div>

      <div className="w-full max-w-4xl mb-6">
        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="p-2 border rounded w-full"
        >
          <option value="">All Categories</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
        </select>
      </div>

      {/* Job Cards */}
      <div className="w-full max-w-4xl">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p className="text-center text-gray-500">No jobs found.</p>
        )}
      </div>
    </div>
  );
}
