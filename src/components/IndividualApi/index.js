import { Component } from "react";
import Cookies from "js-cookie";
import { MdLocationOn } from "react-icons/md";
import { BsBriefcaseFill, BsBoxArrowUpRight } from "react-icons/bs";
import { Redirect } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import Loader from "react-loader-spinner";
import Header from "../Header";

import "./index.css";

class IndividualApi extends Component {
  state = {
    IndividialData: {},
    SimilarJobsData: [],
    isLoadingIndividial: true,
  };

  onLogout = () => {
    const { history } = this.props;
    Cookies.remove("jwt_token");
    history.replace("/login");
  };

  onHomeNavigate = () => {
    const { history } = this.props;
    history.push("/");
  };

  onJobsNavigate = () => {
    const { history } = this.props;
    history.push("/jobs");
  };

  componentDidMount() {
    this.getIndividualData();
  }

  getIndividualData = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const url = `https://apis.ccbp.in/jobs/${id}`;
    const getCookie = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      const updatedIndividialData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        lifeAtCompany: data.job_details.life_at_company,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        skills: data.job_details.skills,
        jobDescription: data.job_details.job_description,
        packagePerAnnum: data.job_details.package_per_annum,
        location: data.job_details.location,
        rating: data.job_details.rating,
        title: data.job_details.title,
      };
      const updatedSimilarJobsData = data.similar_jobs.map((each_similar) => ({
        companyLogoUrlSimilar: each_similar.company_logo_url,
        employmentTypeSimilar: each_similar.employment_type,
        idSimilar: each_similar.id,
        jobDescriptionSimilar: each_similar.job_description,
        locationSimilar: each_similar.location,
        ratingSimilar: each_similar.rating,
        titleSimilar: each_similar.title,
      }));
      this.setState({
        IndividialData: updatedIndividialData,
        SimilarJobsData: updatedSimilarJobsData,
        isLoadingIndividial: false,
      });
    }
  };

  render() {
    if (Cookies.get("jwt_token") === undefined) {
      return <Redirect to="/login" />;
    }
    const { IndividialData, SimilarJobsData, isLoadingIndividial } = this.state;
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      lifeAtCompany,
      skills,
      employmentType,
      id,
      jobDescription,
      packagePerAnnum,
      rating,
      title,
      location,
    } = IndividialData;
    return (
      <>
        <Header
          onJobNavbar={this.onJobsNavigate}
          onHomeNavigate={this.onHomeNavigate}
          onLogOut={this.onLogout}
        />
        {isLoadingIndividial ? (
          <div className="IndividialLoading">
            <Loader type="ThreeDots" color="#6366f1" height={50} width={50} />
          </div>
        ) : (
          <div>
            <div className="IndividualFlex">
              <div className="jobListCardIndividual">
                <div className="topFlexIndividual">
                  <img src={companyLogoUrl} className="companyLogoIndividual" />
                  <div className="headingAndRatingIndividual">
                    <h1 className="jobListheadingIndividual">{title}</h1>
                    <p className="jobListparaIndividual">
                      <span className="starLogoIndividual">
                        <IoStar />
                      </span>
                      {rating}
                    </p>
                  </div>
                </div>
                <div className="middleSectionIndividual">
                  <div className="locationAndTypeIndividual">
                    <MdLocationOn className="MdLocationOn" />
                    <p className="middleParaIndividual">{location}</p>
                    <BsBriefcaseFill className="BsBriefcaseFill" />
                    <p className="middleParaIndividual">{employmentType}</p>
                  </div>
                  <p className="middleParaIndividual">{packagePerAnnum}</p>
                </div>
                <hr
                  style={{
                    width: "100%",
                    marginLeft: 0,
                    border: "1px solid #7e858e",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h1 className="descriptionIndividual">Description</h1>
                  <a
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "none",
                    }}
                    href={companyWebsiteUrl}
                  >
                    <p className="VisitStyle">Visit</p>
                    <BsBoxArrowUpRight style={{ color: "#6366f1" }} />
                  </a>
                </div>
                <p className="descriptionParaIndividual">{jobDescription}</p>

                <h1 className="skillHeadingIndividual">Skills</h1>
                <ul className="skillsUl">
                  {skills.map((each_skill) => (
                    <li className="skillsLi">
                      <img src={each_skill.image_url} className="skillsImg" />
                      <p className="skillsPara">{each_skill.name}</p>
                    </li>
                  ))}
                </ul>

                <h1 className="lifeAtCompanyHeading">life at Company</h1>
                <div className="lifeAtCompanySection">
                  <p className="lifeAtCompanyPara">
                    {lifeAtCompany.description}
                  </p>
                  <img
                    src={lifeAtCompany.image_url}
                    className="lifeAtCompanyImg"
                  />
                </div>
              </div>
            </div>

            <div className="SimilarSectionFlex">
              <div style={{ marginBottom: "30px" }}>
                <h1 className="similarHeading">Similar Jobs</h1>
                <ul className="similarUl">
                  {SimilarJobsData.map((each) => (
                    <li key={each.idSimilar} className="jobListCardSimilar">
                      <div className="topFlexSimilar">
                        <img
                          src={each.companyLogoUrlSimilar}
                          className="companyLogoSimilar"
                        />
                        <div className="headingAndRatingSimilar">
                          <h1 className="jobListheadingSimilar">
                            {each.titleSimilar}
                          </h1>
                          <p className="jobListparaSimilar">
                            <span className="starLogoSimilar">
                              <IoStar />
                            </span>
                            {each.ratingSimilar}
                          </p>
                        </div>
                      </div>
                      <h1 className="description">Description</h1>
                      <p className="descriptionPara">
                        {each.jobDescriptionSimilar}
                      </p>

                      <div className="middleSectionSimilar">
                        <div className="locationAndTypeSimilar">
                          <MdLocationOn
                            style={{
                              marginTop: "1px",
                              color: "white",
                              marginRight: "3px",
                            }}
                          />
                          <p className="middleParaSimilar">
                            {each.locationSimilar}
                          </p>
                          <BsBriefcaseFill
                            style={{
                              marginLeft: "13px",
                              marginTop: "1px",
                              color: "white",
                              marginRight: "5px",
                            }}
                          />
                          <p className="middleParaSimilar">
                            {each.employmentTypeSimilar}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default IndividualApi;
