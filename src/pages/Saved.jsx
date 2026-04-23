import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";

function Saved() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setJobs(data);
  }, []);

  const remove = (job) => {
    const updated = jobs.filter((j) => j.id !== job.id);
    setJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  return (
    <div className="page">
      <h1>Saved Jobs</h1>

      {jobs.length === 0 ? (
        <p>No saved jobs</p>
      ) : (
        <div className="grid">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSave={remove}
              isSaved={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Saved;