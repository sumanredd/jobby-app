import { Component } from "react";
import "./index.css";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

class LoginForm extends Component {
  state = { username: "", password: "", errorMsg: "" };

  onsubmit = async (event) => {
    event.preventDefault();
    const { username, password, errorMsg } = this.state;
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      const { history } = this.props;
      Cookies.set("jwt_token", data.jwt_token, { expires: 30 });
      history.replace("/");
    } else {
      this.setState({ errorMsg: data.error_msg });
    }
  };

  userNameText = (event) => {
    this.setState({ username: event.target.value });
  };

  passwordText = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    if (Cookies.get("jwt_token") !== undefined) {
      return <Redirect to="/" />;
    }
    const { errorMsg } = this.state;
    return (
      <div className="loginFormBg">
        <div className="card">
          <img
            className="logoImg"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <form onSubmit={this.onsubmit}>
            <label htmlFor="userName" className="labelText">
              USERNAME
            </label>
            <br />
            <input
              autoComplete="off"
              id="userName"
              onChange={this.userNameText}
              className="loginInput"
              type="text"
            />
            <br />
            <label htmlFor="passWord" className="labelText">
              PASSWORD
            </label>
            <br />
            <input
              autoComplete="off"
              id="passWord"
              onChange={this.passwordText}
              className="loginInput"
              type="password"
            />
            <br />
            <button className="loginBtn" type="submit">
              Login
            </button>
            {errorMsg.length === 0 ? (
              <p>""</p>
            ) : (
              <p className="errorMsg">*{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    );
  }
}
export default LoginForm;
