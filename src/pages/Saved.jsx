import { useState, useEffect } from 'react'
import JobCard from '../components/JobCard.jsx'

const Saved = () => {
  const [savedJobs, setSavedJobs] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]')
    setSavedJobs(saved)
  }, [])

  const handleRemove = (job) => {
    const updated = savedJobs.filter(s => s.id !== job.id)
    localStorage.setItem('savedJobs', JSON.stringify(updated))
    setSavedJobs(updated)
  }

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem', fontSize: '2.8rem' }}>Saved Jobs ({savedJobs.length})</h1>

      {savedJobs.length > 0 ? (
        <div className="jobs-grid">
          {savedJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              isSaved={true}
              onToggleSave={handleRemove}
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <h2>No saved jobs yet</h2>
          <p>Jobs you save will appear here.</p>
        </div>
      )}
    </div>
  )
}

export default Saved