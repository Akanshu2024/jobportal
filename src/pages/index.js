// pages/index.js
import { connectToDatabase } from '../../lib/mongodb';
 
 
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';

export default function Home({ jobs }) {
  const [filters, setFilters] = useState({
    search: '',
    salary: '',
    category: ''
  });

const filteredJobs = jobs.filter((job) => {
  const matchesSearch =
    (job.title && job.title.toLowerCase().includes(filters.search.toLowerCase())) ||
    (job.company && job.company.toLowerCase().includes(filters.search.toLowerCase())) ||
    (job.location && job.location.toLowerCase().includes(filters.search.toLowerCase()));

  const matchesSalary =
    !filters.salary || job.salary >= Number(filters.salary);

  const matchesCategory =
    !filters.category || job.category === filters.category;

  return matchesSearch && matchesSalary && matchesCategory;
});

  return (
    <div className="min-h-screen bg-gray-50 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">Job Listings</h1>
      <SearchBar filters={filters} setFilters={setFilters} />
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

export async function getServerSideProps() {
  const db = await connectToDatabase();
  const jobs = await db.collection('jobs').find({}).toArray();

  return {
    props: {
      jobs: JSON.parse(JSON.stringify(jobs)), // serialize ObjectId
    },
  };
}
