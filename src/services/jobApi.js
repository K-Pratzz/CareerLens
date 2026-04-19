const BASE_URL = "https://remotive.com/api/remote-jobs";

// Fetch all jobs
export const fetchJobs = async () => {
  try {
    const res = await fetch(BASE_URL);

    // Important: fetch only throws error on network failure
    // NOT on 404/500 → so we manually check
    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data = await res.json();

    // API returns { jobs: [...] }
    return data.jobs;

  } catch (error) {
    // Bubble error up → component will handle UI
    throw error;
  }
};