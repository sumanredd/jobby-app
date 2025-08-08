import { Component } from "react";
import { withRouter } from "react-router-dom";

class Header extends Component {
  onLogout = () => {
    const { onLogOut } = this.props;
    onLogOut();
  };

  onHome = () => {
    const { onHomeNavigate } = this.props;
    onHomeNavigate();
  };

  onJobsNav = () => {
    const { onJobNavbar } = this.props;
    onJobNavbar();
  };

  render() {
    return (
      <div className="NavBar">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="homeLogo"
        />
        <ul className="navUl">
          <li className="li" onClick={this.onHome}>
            Home
          </li>
          <li onClick={this.onJobsNav} className="li">
            Jobs
          </li>
        </ul>
        <div>
          <button
            type="button"
            onClick={this.onLogout}
            className="homeLogoutBtn"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
