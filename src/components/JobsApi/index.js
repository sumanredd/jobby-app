import { Component } from "react";
import Cookies from "js-cookie";
import JobList from "../JobsList";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { FaSearch } from "react-icons/fa";

class JobApi extends Component {
  state = { jobListData: [], FailureImgSrc: "", isLoading: true, search: "" };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getJobData();
  }

  searchValue = null;

  getJobData = async () => {
    const url = "https://apis.ccbp.in/jobs";
    const getCookie = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      const updatedData = data.jobs.map((each_jobList) => ({
        companyLogoUrl: each_jobList.company_logo_url,
        employmentType: each_jobList.employment_type,
        id: each_jobList.id,
        jobDescription: each_jobList.job_description,
        packagePerAnnum: each_jobList.package_per_annum,
        location: each_jobList.location,
        rating: each_jobList.rating,
        title: each_jobList.title,
      }));
      this.setState({ jobListData: updatedData, isLoading: false });
    } else {
      this.setState({
        FailureImgSrc:
          "https://assets.ccbp.in/frontend/react-js/failure-img.png",
        isLoading: false,
      });
    }
  };

  searchJobs = (event) => {
    this.searchValue = event.target.value;
  };

  onSearchBtn = () => {
    this.setState({ search: this.searchValue });
  };

  renderJobList = () => {
    const { searchRadio, searchCheckBox } = this.props;
    const { jobListData, isLoading, search, FailureImgSrc } = this.state;
    const radioCheck = searchRadio !== "";
    const checkBox = searchCheckBox.length !== 0;
    const filteredData = checkBox
      ? jobListData.filter((each) =>
          searchCheckBox.includes(each.employmentType)
        )
      : jobListData.filter((each) =>
          each.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(search.trim().toLowerCase().replace(/\s+/g, ""))
        );
    const finalData = radioCheck
      ? filteredData.filter(
          (each_item) => searchRadio <= parseInt(each_item.packagePerAnnum)
        )
      : filteredData;
    const SearchFinalData =
      search !== ""
        ? finalData.filter((each) =>
            each.title
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(search.trim().toLowerCase().replace(/\s+/g, ""))
          )
        : finalData;
    const NoJobsFound = SearchFinalData.length === 0;
    // const failure = FailureImgSrc !== ''
    return (
      <>
        <div className="searchContainer">
          <input
            onChange={this.searchJobs}
            placeholder="Search"
            className="searchJob"
            type="search"
          />
          <button className="searchBtnStyle" onClick={this.onSearchBtn}>
            <FaSearch className="searchicon" />
          </button>
        </div>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "250px",
              marginLeft: "200px",
            }}
          >
            <Loader type="ThreeDots" color="#6366f1" height={50} width={50} />
          </div>
        ) : NoJobsFound ? (
          <div className="noJobFoundFlex">
            <img
              className="noJobFound"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <p className="noJobPara">No Jobs Found</p>
            <p style={{ color: "#7e858e", fontSize: "11px" }}>
              We could not find any jobs. Try other filters
            </p>
          </div>
        ) : (
          <ul className="mobileUl">
            {SearchFinalData.map((each) => (
              <JobList jobData={each} key={each.id} />
            ))}
          </ul>
        )}
      </>
    );
  };

  render() {
    return this.renderJobList();
  }
}
export default JobApi;
