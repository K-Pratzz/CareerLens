import React, { useEffect, useState, useCallback } from "react";
import { fetchJobs } from "../services/jobApi";
import JobCard from "../components/JobCard";
import { debounce } from "../utils/debounce";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Infinite scroll state
  const [visibleCount, setVisibleCount] = useState(6);

  // 🔥 Fetch jobs
  useEffect(() => {
    const getJobs = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchJobs();
        setJobs(data);
        setFilteredJobs(data);
      } catch (err) {
        setError("Failed to fetch jobs");
      }

      setLoading(false);
    };

    getJobs();
  }, []);

  // 🔥 Debounced search (performance optimized)
  const handleSearch = useCallback(
    debounce((value) => {
      const result = jobs.filter((job) =>
        job.title.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredJobs(result);
      setVisibleCount(6); // reset scroll when new search happens
    }, 500),
    [jobs]
  );

  // 🔥 Input handler
  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    handleSearch(value);
  };

  // 🔥 Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50;

      if (bottomReached) {
        setVisibleCount((prev) => prev + 6);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="page">
      <h1>Jobs</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search job..."
        value={search}
        onChange={onSearchChange}
      />

      {/* ⏳ Loading */}
      {loading && <p>Loading jobs...</p>}

      {/* ❌ Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 📦 Jobs Grid */}
      <div className="grid">
        {!loading && filteredJobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          filteredJobs
            .slice(0, visibleCount)
            .map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
}

export default Jobs;