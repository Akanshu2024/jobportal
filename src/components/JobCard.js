// src/components/JobCard.js
export default function JobCard({ job }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-2xl font-bold text-blue-600">{job.title}</h2>
      <p className="text-gray-700">{job.company} – {job.location}</p>
      <p className="text-gray-600 mt-1">{job.description}</p>
      <p className="mt-2 font-semibold text-sm">Salary: ₹{job.salary}</p>
      <p className="text-xs mt-1 italic">Category: {job.category}</p>
    </div>
  );
}
