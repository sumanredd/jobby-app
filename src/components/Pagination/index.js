import {Component} from 'react'
import JobList from '../JobList'
import './index.css'

class JobsListContainer extends Component {
state = {
currentPage: 1,
jobsPerPage: 5,
}

handlePageClick = pageNum => {
this.setState({currentPage: pageNum})
}

render() {
const {jobsData} = this.props
const {currentPage, jobsPerPage} = this.state
const indexOfLastJob = currentPage * jobsPerPage
const indexOfFirstJob = indexOfLastJob - jobsPerPage
const currentJobs = jobsData.slice(indexOfFirstJob, indexOfLastJob)
const totalPages = Math.ceil(jobsData.length / jobsPerPage)
return (
  <div className='jobsListContainer'>
    <ul className='jobsList'>
      {currentJobs.map(job => (
        <JobList key={job.id} jobData={job} />
      ))}
    </ul>
    <div className='pagination'>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => this.handlePageClick(i + 1)}
          className={`pageButton ${
            currentPage === i + 1 ? 'activePage' : ''
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  </div>
)
}
}

export default JobsListContainer
