const API_URL = "https://remotive.com/api/remote-jobs"

export const fetchJobs = async () => {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error("Failed to load jobs")
    const data = await res.json()
    return data.jobs || []
  } catch (err) {
    console.error(err)
    throw err
  }
}