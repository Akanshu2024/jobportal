// pages/employer/dashboard.js

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function EmployerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // Wait until session is loaded

    if (!session || session.role !== "employer") {
      router.push("/auth/login");
      return;
    }

    const fetchJobs = async () => {
      try {
        const res = await fetch(`/api/jobs?employer=${session.id}`);
        const data = await res.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [session, status, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-8">Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link href="/employer/dashboard" className="block py-2 hover:bg-blue-600 rounded">
                Overview
              </Link>
            </li>
            <li>
              <Link href="/employer/post" className="block py-2 hover:bg-blue-600 rounded">
                Post a Job
              </Link>
            </li>
            <li>
              <Link href="/employer/manage" className="block py-2 hover:bg-blue-600 rounded">
                Manage Jobs
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-6">Welcome, {session.user.name}!</h1>

        {/* Job Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Jobs Posted</h3>
            <p className="text-2xl font-bold">{jobs.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Pending Applications</h3>
            <p className="text-2xl font-bold">0</p> {/* Add logic for pending applications */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Applications</h3>
            <p className="text-2xl font-bold">0</p> {/* Add logic for total applications */}
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Job Listings</h2>
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
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job._id} className="border-b">
                    <td className="py-3 px-6">{job.title}</td>
                    <td className="py-3 px-6">{job.company}</td>
                    <td className="py-3 px-6">{job.location}</td>
                    <td className="py-3 px-6">
                      <Link href={`/employer/edit/${job._id}`}>
                        <a className="mr-2 text-blue-500 hover:underline">Edit</a>
                      </Link>
                      <button onClick={() => console.log("Delete job")} className="text-red-500 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-3 px-6 text-center text-gray-500">
                    No jobs posted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
