import axios from 'axios'

const API = axios.create({
   baseURL: 'http://localhost:5000/api',
  // baseURL: '/api',
})

export const getJobs = () => API.get('/jobs')
export const getJob = (id) => API.get(`/jobs/${id}`)
export const createJob = (data) => API.post('/jobs', data)
export const updateJob = (id, data) => API.put(`/jobs/${id}`, data)
export const deleteJob = (id) => API.delete(`/jobs/${id}`)
