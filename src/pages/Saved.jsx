import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";

function Saved() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(data);
  }, []);

  const removeJob = (job) => {
    const updated = savedJobs.filter((j) => j.id !== job.id);
    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  return (
    <div className="page">
      <h1>Saved Jobs</h1>

      {savedJobs.length === 0 ? (
        <p>No saved jobs</p>
      ) : (
        <div className="grid">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSave={removeJob}
              isSaved={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Saved;