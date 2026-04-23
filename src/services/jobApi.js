export const fetchJobs = async () => {
  const res = await fetch("https://remotive.com/api/remote-jobs");

  if (!res.ok) {
    throw new Error("API error");
  }

  const data = await res.json();
  return data.jobs;
};