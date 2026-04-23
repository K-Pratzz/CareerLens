import React, { useEffect, useState, useCallback } from "react";
import { fetchJobs } from "../services/jobApi";
import JobCard from "../components/JobCard";
import { debounce } from "../utils/debounce";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [displayJobs, setDisplayJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [location, setLocation] = useState("");

  const [savedJobs, setSavedJobs] = useState(
    JSON.parse(localStorage.getItem("savedJobs")) || []
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [visibleCount, setVisibleCount] = useState(6);

  // 🔥 Fetch jobs
  useEffect(() => {
    const getJobs = async () => {
      setLoading(true);
      try {
        const data = await fetchJobs();
        setJobs(data);
        setDisplayJobs(data);
      } catch {
        setError("Failed to fetch jobs");
      }
      setLoading(false);
    };

    getJobs();
  }, []);

  // 🔥 MAIN LOGIC: search + filter + sort together
  const applyLogic = useCallback(
    debounce((searchValue, locationValue, sortValue) => {
      let result = [...jobs];

      // 🔍 SEARCH
      if (searchValue) {
        result = result.filter((job) =>
          job.title.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      // 📍 FILTER (location)
      if (locationValue) {
        result = result.filter((job) =>
          job.candidate_required_location
            .toLowerCase()
            .includes(locationValue.toLowerCase())
        );
      }

      // 🔄 SORT
      if (sortValue === "az") {
        result.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortValue === "za") {
        result.sort((a, b) => b.title.localeCompare(a.title));
      }

      setDisplayJobs(result);
      setVisibleCount(6);
    }, 400),
    [jobs]
  );

  // 🔥 Trigger logic when inputs change
  useEffect(() => {
    applyLogic(search, location, sort);
  }, [search, location, sort, applyLogic]);

  // 🔥 Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50;

      if (bottom) {
        setVisibleCount((prev) => prev + 6);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 💾 SAVE JOB
  const toggleSave = (job) => {
    let updated;

    const exists = savedJobs.find((j) => j.id === job.id);

    if (exists) {
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

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search job..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📍 FILTER */}
      <input
        type="text"
        placeholder="Filter by location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {/* 🔄 SORT */}
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="default">Sort</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="grid">
        {displayJobs.slice(0, visibleCount).map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onSave={toggleSave}
            isSaved={savedJobs.some((j) => j.id === job.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Jobs;