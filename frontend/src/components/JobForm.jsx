import React, { useState, useEffect } from 'react'
import { createJob, getJob, updateJob } from '../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import isFuture from 'date-fns/isFuture'
import '../styles/style.css'; 

const statusOptions = ['Applied', 'Interview', 'Offer', 'Rejected']

function JobForm() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    companyName: '',
    jobTitle: '',
    applicationDate: '',
    status: 'Applied'
  })
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (id) {
      getJob(id)
        .then(res => {
          const j = res.data
          setForm({
            companyName: j.companyName,
            jobTitle: j.jobTitle,
            applicationDate: j.applicationDate.slice(0, 10),
            status: j.status
          })
        })
        .catch(() => alert('Failed to load job'))
    }
  }, [id])

  const validate = () => {
    const errs = []
    if (!form.companyName || form.companyName.trim().length < 3)
      errs.push('Company name must be at least 3 characters')
    if (!form.jobTitle) errs.push('Job title is required')
    if (!form.applicationDate) errs.push('Application date is required')
    else if (isFuture(new Date(form.applicationDate)))
      errs.push('Application date cannot be in the future')
    setErrors(errs)
    return errs.length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      if (id) await updateJob(id, form)
      else await createJob(form)
      navigate('/')
    } 
    catch (err) {
      console.error(err)
      setErrors(['Server error'])
    }
  }

  return (
    <div className="form-container">
      <h2>{id ? 'Edit Job' : 'Add Job Application'}</h2>
      {errors.length > 0 && (
        <div className="error-box">
          <ul>{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>Company Name*</label>
        <input
          type="text"
          value={form.companyName}
          onChange={e => setForm({ ...form, companyName: e.target.value })}
        />

        <label>Job Title*</label>
        <input
          type="text"
          value={form.jobTitle}
          onChange={e => setForm({ ...form, jobTitle: e.target.value })}
        />

        <label>Application Date*</label>
        <input
          type="date"
          value={form.applicationDate}
          onChange={e => setForm({ ...form, applicationDate: e.target.value })}
        />

        <label>Status</label>
        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          {statusOptions.map(s => <option key={s}>{s}</option>)}
        </select>

        <button type="submit">{id ? 'Save Changes' : 'Add Job'}</button>
        <button type="button" className="cancel" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  )
}

export default JobForm
