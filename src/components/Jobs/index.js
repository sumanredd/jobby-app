import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobApi from '../JobsApi'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobPage extends Component {
  state = {searchByRadio: '', searchByCheckBox: []}

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onHomeNavigate = () => {
    const {history} = this.props
    history.push('/')
  }

  onJobsNavigate = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  inputCheck = event => {
    this.setState({searchByRadio: parseInt(event.target.value)})
  }

  inputArrayCheckBox = event => {
    this.setState(prevState => {
      if (event.target.checked) {
        return {
          searchByCheckBox: [...prevState.searchByCheckBox, event.target.value],
        }
      }
      return {
        searchByCheckBox: prevState.searchByCheckBox.filter(
          item => item !== event.target.value,
        ),
      }
    })
  }

  render() {
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to='/login' />
    }
    const {searchByRadio, searchByCheckBox} = this.state
    return (
      <>
        <Header
          onJobNavbar={this.onJobsNavigate}
          onHomeNavigate={this.onHomeNavigate}
          onLogOut={this.onLogout}
        />
        <div className='jobPageBg'>
          <div className='ProfileSection'>
            <div className='profileBg'>
              <img
                className='profileImg'
                src='https://i.ibb.co/N6t4kVxP/Adobe-Express-file.png'
                alt='Adobe-Express-file'
                border='0'
              />
              <h1 className='profileHeading'>Sumanth Reddy</h1>
              <p className='profilePara'>
                Lead Software Developer and AI/ML expert
              </p>
            </div>
            <hr className='customHr' />
            <div className='employmentFlex'>
              <h1 className='ProfileListHeading'>Type of Employement</h1>
              <ul className='ProfileListUl'>
                {employmentTypesList.map(eachType => (
                  <li key={eachType.employmentTypeId} className='ProfileListLi'>
                    <input
                      onClick={this.inputArrayCheckBox}
                      id={eachType.employmentTypeId}
                      value={eachType.label}
                      type='checkbox'
                      style={{cursor: 'pointer'}}
                    />
                    <label
                      htmlFor={eachType.employmentTypeId}
                      className='ProfileLabel'
                    >
                      {eachType.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <hr className='customHr' />

            <div className='employmentFlex'>
              <h1 className='ProfileListHeading'>Salary Range</h1>
              <ul className='ProfileListUl'>
                {salaryRangesList.map(eachSalary => (
                  <li
                    key={eachSalary.salaryRangeId}
                    className='display1 ProfileListLi'
                  >
                    <input
                      onClick={this.inputCheck}
                      type='radio'
                      name='salary'
                      value={eachSalary.label}
                      style={{cursor: 'pointer'}}
                      id={eachSalary.salaryRangeId}
                    />
                    <label
                      htmlFor={eachSalary.salaryRangeId}
                      className='ProfileLabel1'
                    >
                      {eachSalary.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <select className='display selectStyle' onChange={this.inputCheck}>
              <option value='' disabled selected>
                Select Range
              </option>
              <option value='10 LPA and above'>10 LPA and above</option>
              <option value='20 LPA and above'>20 LPA and above</option>
              <option value='30 LPA and above'>30 LPA and above</option>
              <option value='40 LPA and above'>40 LPA and above</option>
            </select>
          </div>

          <div className='mobileJobApi'>
            <JobApi
              searchCheckBox={searchByCheckBox}
              searchRadio={searchByRadio}
            />
          </div>
        </div>
      </>
    )
  }
}
export default JobPage
