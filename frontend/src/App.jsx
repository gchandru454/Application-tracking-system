import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import JobList from './components/JobList'
import JobForm from './components/JobForm'
import JobDetails from './components/JobDetails'

function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <h1>Job Application Tracker</h1>
        <nav>
          <Link to="/">All Jobs</Link>
          <Link to="/add">Add Job</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/add" element={<JobForm />} />
          <Route path="/edit/:id" element={<JobForm editMode />} />
          <Route path="/job/:id" element={<JobDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
