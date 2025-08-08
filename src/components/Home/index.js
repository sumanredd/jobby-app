import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import "./index.css";
import { TypeAnimation } from "react-type-animation";
import Header from "../Header";

class Home extends Component {
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

  render() {
    if (Cookies.get("jwt_token") === undefined) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <Header
          onJobNavbar={this.onJobsNavigate}
          onHomeNavigate={this.onHomeNavigate}
          onLogOut={this.onLogout}
        />
        <div className="homeBg">
          <h1 className="homeHeading">
            Find The Job That <br />
            <span style={{ color: "#4f46e5" }}>
              <TypeAnimation
                sequence={[
                  "Fits Your Life",
                  1500,
                  "",
                  500,
                  "Drives Your Passion",
                  1500,
                  "",
                  500,
                  "Builds Your Future",
                  1500,
                  "",
                  500,
                  "Shapes Your Career",
                  1500,
                  "",
                  500,
                ]}
                wrapper="span"
                speed={50}
                style={{ display: "inline-block" }}
                repeat={Infinity}
              />
            </span>
          </h1>
          <p className="homePara">
            Millions of people are searching for jobs, salary
            <br />
            information, company reviews. Find the Job that fits your
            <br />
            abilities and potential
          </p>
          <div>
            <button
              onClick={this.onJobsNavigate}
              type="button"
              className="findjobsBtn"
            >
              Find Jobs
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
