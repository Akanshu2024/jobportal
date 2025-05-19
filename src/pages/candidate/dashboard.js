// pages/candidate/dashboard.js
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function CandidateDashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const session = await getSession();
      
      console.log("Session Data:", session); // Check the session data here
      
      if (!session || session.user.role !== "user") {
        router.push("/auth/login");
        return;
      }

      try {
        const res = await axios.get(`/api/applications/user/${session.user._id}`);
        setApplications(res.data);
      } catch (err) {
        console.error("Failed to load applications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [router]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Job Applications</h1>

      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>You have not applied for any jobs yet.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app._id} className="p-4 border rounded shadow-sm bg-white">
              <h3 className="text-xl font-semibold">{app.job.title}</h3>
              <p className="text-gray-600">{app.job.company} - {app.job.location}</p>
              <p className="text-sm">Status: <strong>{app.status}</strong></p>
              <p className="text-sm text-gray-500">Applied on {new Date(app.applied_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
