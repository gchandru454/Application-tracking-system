import React, { useEffect, useState } from 'react'
import { getJob } from '../api/api'
import { useParams, useNavigate } from 'react-router-dom'
import format from 'date-fns/format'
import '../styles/style.css'; 
function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)

  useEffect(() => {
    getJob(id)
      .then(res => setJob(res.data))
      .catch(() => alert('Failed to load details'))
  }, [id])

  if (!job) return <p>Loading...</p>

  return (
    <div className="details">
      <h2>{job.companyName}</h2>
      <p><strong>Job Title:</strong> {job.jobTitle}</p>
      <p><strong>Application Date:</strong> {format(new Date(job.applicationDate), 'yyyy-MM-dd')}</p>
      <p><strong>Status:</strong> {job.status}</p>
      <button onClick={() => navigate(`/edit/${job._id}`)}>Edit</button>
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  )
}

export default JobDetails
