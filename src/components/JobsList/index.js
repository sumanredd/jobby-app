import { Component } from "react";
import "./index.css";
import { MdLocationOn } from "react-icons/md";
import { BsBriefcaseFill } from "react-icons/bs";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";

class JobList extends Component {
  render() {
    const { jobData } = this.props;
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      packagePerAnnum,
      rating,
      title,
      location,
    } = jobData;
    return (
      <div className="marginLeftCard">
        <Link className="link_card" to={`/jobs/${id}`}>
          <li className="jobListCard">
            <div className="topFlex">
              <img src={companyLogoUrl} className="companyLogo" />
              <div className="headingAndRating">
                <h1 className="jobListheading">{title}</h1>
                <p className="jobListpara">
                  <span className="starLogo">
                    <IoStar />
                  </span>
                  {rating}
                </p>
              </div>
            </div>

            <div className="middleSection">
              <div className="locationAndType">
                <MdLocationOn className="MdLocationOn" />
                <p className="middlePara">{location}</p>
                <BsBriefcaseFill className="BsBriefcaseFill" />
                <p className="middlePara">{employmentType}</p>
              </div>
              <p className="middlePara">{packagePerAnnum}</p>
            </div>
            <hr
              style={{
                width: "100%",
                marginLeft: 0,
                border: "1px solid #7e858e",
              }}
            />
            <h1 className="description">Description</h1>
            <p className="descriptionPara">{jobDescription}</p>
          </li>
        </Link>
      </div>
    );
  }
}

export default JobList;
