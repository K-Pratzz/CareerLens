import React from "react";

function JobCard({ job }) {
  return (
    <div className="card">
      <h3>{job.title}</h3>
      <p>{job.company_name}</p>
      <p>{job.candidate_required_location}</p>

      {/* 🔥 Fix HTML rendering */}
      <div
        dangerouslySetInnerHTML={{
          __html: job.description.slice(0, 150) + "...",
        }}
      />

      <a href={job.url} target="_blank" rel="noreferrer">
        Apply
      </a>
    </div>
  );
}

export default JobCard;