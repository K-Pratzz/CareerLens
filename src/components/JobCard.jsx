import React from "react";

function JobCard({ job, onSave, isSaved }) {
  return (
    <div className="card">
      <h3>{job.title}</h3>
      <p>{job.company_name}</p>
      <p>{job.candidate_required_location}</p>

      <div
        dangerouslySetInnerHTML={{
          __html: job.description.slice(0, 120) + "...",
        }}
      />

      <a href={job.url} target="_blank" rel="noreferrer">
        Apply
      </a>

      <button onClick={() => onSave(job)}>
        {isSaved ? "Remove" : "Save"}
      </button>
    </div>
  );
}

export default JobCard;