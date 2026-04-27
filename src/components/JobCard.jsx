const JobCard = ({ job, isSaved, onToggleSave }) => {
  const cleanDesc = job.description
    ? job.description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160) + '...'
    : 'No description available.'

  return (
    <div className="job-card">
      <h3 className="job-title">{job.title}</h3>
      <p className="company-name">{job.company_name}</p>
      <p className="location">
        {job.candidate_required_location || 'Worldwide'}
      </p>

      <p className="description">{cleanDesc}</p>

      {job.tags && job.tags.length > 0 && (
        <div className="tags">
          {job.tags.slice(0, 5).map((tag, i) => (
            <span key={i} className="tag">#{tag}</span>
          ))}
        </div>
      )}

      <div className="card-actions">
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="apply-btn"
        >
          Apply Now
        </a>
        <button 
          onClick={() => onToggleSave(job)}
          className={`save-btn ${isSaved ? 'remove' : ''}`}
        >
          {isSaved ? 'Remove' : 'Save Job'}
        </button>
      </div>
    </div>
  )
}

export default JobCard