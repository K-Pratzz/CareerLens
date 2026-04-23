import React, { useEffect, useState } from "react";
import { fetchJobs } from "../services/jobApi";
import JobCard from "../components/JobCard";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [displayJobs, setDisplayJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("default");

  const [savedJobs, setSavedJobs] = useState(
    JSON.parse(localStorage.getItem("savedJobs")) || []
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
        setDisplayJobs(data);
      } catch {
        alert("Error fetching jobs");
      }
      setLoading(false);
    };

    load();
  }, []);

  // 🔍 SEARCH + FILTER + SORT
  useEffect(() => {
    let result = [...jobs];

    if (search) {
      result = result.filter((j) =>
        j.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location) {
      result = result.filter((j) =>
        j.candidate_required_location
          .toLowerCase()
          .includes(location.toLowerCase())
      );
    }

    if (sort === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "za") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    setDisplayJobs(result);
  }, [search, location, sort, jobs]);

  // 💾 SAVE JOB
  const toggleSave = (job) => {
    let updated;

    if (savedJobs.find((j) => j.id === job.id)) {
      updated = savedJobs.filter((j) => j.id !== job.id);
    } else {
      updated = [...savedJobs, job];
    }

    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  return (
    <div className="page">
      <h1>Jobs</h1>

      <input
        placeholder="Search job"
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        placeholder="Filter location"
        onChange={(e) => setLocation(e.target.value)}
      />

      <select onChange={(e) => setSort(e.target.value)}>
        <option value="default">Sort</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {displayJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSave={toggleSave}
              isSaved={savedJobs.some((j) => j.id === job.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;