/* eslint-disable react/sort-comp, camelcase, no-nested-ternary */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {FaSearch} from 'react-icons/fa'
import JobList from '../JobsList'
import './index.css'

class JobApi extends Component {
  state = {
    jobListData: [],
    FailureImgSrc: '',
    isLoading: true,
    search: '',
    currentPage: 1,
    jobsPerPage: 5,
  }

  searchValue = null

  componentDidMount() {
    window.scrollTo(0, 0)
    this.getJobData()
  }

  
  componentDidUpdate(prevProps) {
    const {searchRadio, searchCheckBox} = this.props
    if (
      prevProps.searchRadio !== searchRadio ||
      prevProps.searchCheckBox !== searchCheckBox
    ) {
      this.setState({currentPage: 1})
    }
  }

  getJobData = async () => {
    const url = 'https://apis.ccbp.in/jobs'
    const getCookie = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getCookie}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.jobs.map(eachJobList => ({
        companyLogoUrl: eachJobList.company_logo_url,
        employmentType: eachJobList.employment_type,
        id: eachJobList.id,
        jobDescription: eachJobList.job_description,
        packagePerAnnum: eachJobList.package_per_annum,
        location: eachJobList.location,
        rating: eachJobList.rating,
        title: eachJobList.title,
      }))
      this.setState({jobListData: updatedData, isLoading: false})
    } else {
      this.setState({
        FailureImgSrc:
          'https://assets.ccbp.in/frontend/react-js/failure-img.png',
        isLoading: false,
      })
    }
  }

  searchJobs = event => {
    this.searchValue = event.target.value
  }

  onSearchBtn = () => {
    this.setState({search: this.searchValue, currentPage: 1})
  }

  changePage = pageNum => {
    this.setState({currentPage: pageNum})
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  renderPagination = totalPages => {
    const {currentPage} = this.state
    const pages = []

    const createPageButton = num => (
      <button
        key={num}
        onClick={() => this.changePage(num)}
        className={`paginationBtn ${currentPage === num ? 'activePage' : ''}`}
      >
        {num}
      </button>
    )

  
    if (totalPages <= 1) return null

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(createPageButton(i))
    } else {
      pages.push(createPageButton(1))

      if (currentPage > 3) pages.push(<span key='start-dots'>...</span>)

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) pages.push(createPageButton(i))

      if (currentPage < totalPages - 2)
        pages.push(<span key='end-dots'>...</span>)

      pages.push(createPageButton(totalPages))
    }

    return (
      <div className='paginationContainer'>
        <button
          onClick={() => this.changePage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className='arrowBtn'
        >
          &lt;
        </button>

        {pages}

        <button
          onClick={() => this.changePage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className='arrowBtn'
        >
          &gt;
        </button>
      </div>
    )
  }

  renderJobList = () => {
    const {searchRadio, searchCheckBox} = this.props
    const {
      jobListData,
      isLoading,
      search,
      FailureImgSrc,
      currentPage,
      jobsPerPage,
    } = this.state

    const radioCheck = searchRadio !== ''
    const checkBox = searchCheckBox.length !== 0

    const filteredData = checkBox
      ? jobListData.filter(each => searchCheckBox.includes(each.employmentType))
      : jobListData.filter(each =>
          each.title
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(search.trim().toLowerCase().replace(/\s+/g, '')),
        )

    const finalData = radioCheck
      ? filteredData.filter(
          eachItem => searchRadio <= parseInt(eachItem.packagePerAnnum),
        )
      : filteredData

    const SearchFinalData =
      search !== ''
        ? finalData.filter(each =>
            each.title
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(search.trim().toLowerCase().replace(/\s+/g, '')),
          )
        : finalData

    const NoJobsFound = SearchFinalData.length === 0

    const totalPages = Math.ceil(SearchFinalData.length / jobsPerPage)
    const indexOfLastJob = currentPage * jobsPerPage
    const indexOfFirstJob = indexOfLastJob - jobsPerPage
    const currentJobs = SearchFinalData.slice(indexOfFirstJob, indexOfLastJob)

    return (
      <>
        <div className='searchContainer'>
          <input
            onChange={this.searchJobs}
            placeholder='Search'
            className='searchJob'
            type='search'
          />
          <button className='searchBtnStyle' onClick={this.onSearchBtn}>
            <FaSearch className='searchicon' />
          </button>
        </div>

        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '250px',
              marginLeft: '200px',
            }}
          >
            <Loader type='ThreeDots' color='#6366f1' height={50} width={50} />
          </div>
        ) : NoJobsFound ? (
          <div className='noJobFoundFlex'>
            <img
              className='noJobFound'
              src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'
              alt='no jobs'
            />
            <p className='noJobPara'>No Jobs Found</p>
            <p style={{color: '#7e858e', fontSize: '11px'}}>
              We could not find any jobs. Try other filters
            </p>
          </div>
        ) : (
          <>
            <ul className='mobileUl'>
              {currentJobs.map(each => (
                <JobList jobData={each} key={each.id} />
              ))}
            </ul>
            {this.renderPagination(totalPages)}
          </>
        )}
      </>
    )
  }

  render() {
    return this.renderJobList()
  }
}

export default JobApi
