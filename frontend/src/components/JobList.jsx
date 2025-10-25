import React, { useEffect, useState } from 'react'
import { getJobs, deleteJob } from '../api/api'
import { Link, useNavigate } from 'react-router-dom'
import ConfirmDialog from './ConfirmDialog'
import format from 'date-fns/format'
import '../styles/style.css'; 

function JobList() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [toDelete, setToDelete] = useState(null)
  const navigate = useNavigate()

  const fetchJobs = async () => {
    try {
      const res = await getJobs()
      console.log("Fetched data:", res.data)
      setJobs(res.data)
    } catch (err) {
      console.error(err)
      alert('Failed to fetch jobs.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteJob(id)
      setToDelete(null)
      fetchJobs()
    } catch (err) {
      console.error(err)
      alert('Delete failed.')
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="job-list">
      <h2>All Job Applications</h2>
      {jobs.length === 0 ? (
        <p>No job applications yet. <Link to="/add">Add one</Link></p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Job Title</th>
              <th>Applied On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job._id}>
                <td>{job.companyName}</td>
                <td>{job.jobTitle}</td>
                <td>{format(new Date(job.applicationDate), 'yyyy-MM-dd')}</td>
                <td>{job.status}</td>
                <td>
                  <button onClick={() => navigate(`/job/${job._id}`)}>View</button>
                  <button onClick={() => navigate(`/edit/${job._id}`)}>Edit</button>
                  <button className="delete" onClick={() => setToDelete(job)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {toDelete && (
        <ConfirmDialog
          title={`Delete ${toDelete.companyName}?`}
          message="Are you sure you want to delete this job?"
          onConfirm={() => handleDelete(toDelete._id)}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  )
}

export default JobList
