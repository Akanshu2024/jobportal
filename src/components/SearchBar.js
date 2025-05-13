// src/components/SearchBar.js
export default function SearchBar({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-4xl">
      <input
        type="text"
        name="search"
        placeholder="Search title, company, location..."
        value={filters.search}
        onChange={handleChange}
        className="p-2 border rounded w-full"
      />
      <input
        type="number"
        name="salary"
        placeholder="Min Salary"
        value={filters.salary}
        onChange={handleChange}
        className="p-2 border rounded w-full"
      />
      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="p-2 border rounded w-full"
      >
        <option value="">All Categories</option>
        <option value="Engineering">Engineering</option>
        <option value="Marketing">Marketing</option>
        <option value="Design">Design</option>
      </select>
    </div>
  );
}
