import { useState, useEffect, useCallback } from 'react'
import JobCard from '../components/JobCard.jsx'
import { fetchJobs } from '../services/jobApi.js'
import { debounce } from '../utils/debounce.js'

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [savedJobs, setSavedJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [sortOption, setSortOption] = useState('default')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load saved jobs from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]')
    setSavedJobs(saved)
  }, [])

  // Fetch jobs
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true)
        const data = await fetchJobs()
        setJobs(data)
        setFilteredJobs(data)
      } catch (err) {
        setError("Failed to load jobs. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    loadJobs()
  }, [])

  // Save to localStorage
  const saveToStorage = (updatedSaved) => {
    localStorage.setItem('savedJobs', JSON.stringify(updatedSaved))
    setSavedJobs(updatedSaved)
  }

  const handleToggleSave = (job) => {
    const isAlreadySaved = savedJobs.some(s => s.id === job.id)
    
    if (isAlreadySaved) {
      const updated = savedJobs.filter(s => s.id !== job.id)
      saveToStorage(updated)
    } else {
      const updated = [...savedJobs, job]
      saveToStorage(updated)
    }
  }

  // Filter + Sort Logic
  const filterAndSortJobs = useCallback(() => {
    let result = [...jobs]

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(job => 
        job.title.toLowerCase().includes(term) ||
        (job.company_name && job.company_name.toLowerCase().includes(term))
      )
    }

    // Location Filter
    if (locationFilter) {
      result = result.filter(job => 
        (job.candidate_required_location || '')
          .toLowerCase()
          .includes(locationFilter.toLowerCase())
      )
    }

    // Sort
    if (sortOption === 'az') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortOption === 'za') {
      result.sort((a, b) => b.title.localeCompare(a.title))
    }

    setFilteredJobs(result)
  }, [jobs, searchTerm, locationFilter, sortOption])

  useEffect(() => {
    filterAndSortJobs()
  }, [filterAndSortJobs])

  const debouncedSearch = debounce((value) => {
    setSearchTerm(value)
  }, 400)

  if (loading) return <div className="container"><h2>Loading jobs...</h2></div>
  if (error) return <div className="container"><h2 style={{color: 'red'}}>{error}</h2></div>

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem', fontSize: '2.8rem' }}>Find Remote Jobs</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search job title..."
          onChange={(e) => debouncedSearch(e.target.value)}
          defaultValue={searchTerm}
        />
        
        <input
          type="text"
          placeholder="Filter by location (e.g. USA)"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />

        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="default">Sort by Default</option>
          <option value="az">A → Z (Title)</option>
          <option value="za">Z → A (Title)</option>
        </select>
      </div>

      <div className="jobs-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              isSaved={savedJobs.some(s => s.id === job.id)}
              onToggleSave={handleToggleSave}
            />
          ))
        ) : (
          <p>No jobs found matching your criteria.</p>
        )}
      </div>
    </div>
  )
}

export default Jobs