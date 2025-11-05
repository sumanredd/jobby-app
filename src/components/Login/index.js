import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: ''}

  componentDidMount() {
    // Wait until Google script is loaded
    if (window.google && window.google.accounts) {
      this.initializeGoogleButton()
    } else {
      const checkGoogle = setInterval(() => {
        if (window.google && window.google.accounts) {
          clearInterval(checkGoogle)
          this.initializeGoogleButton()
        }
      }, 500)
    }
  }

  initializeGoogleButton = () => {
    window.google.accounts.id.initialize({
      client_id:
        '912290476988-2k8b027ratir1dcrel6jbinmtfq35p3a.apps.googleusercontent.com',
      callback: this.handleGoogleResponse,
      ux_mode: 'popup',
    })

    // Match width with login button
    const loginBtn = document.querySelector('.loginBtn')
    const loginBtnWidth = loginBtn ? loginBtn.offsetWidth : 290

    window.google.accounts.id.renderButton(
      document.getElementById('googleBtn'),
      {
        theme: 'outline',
        size: 'large',
        width: loginBtnWidth.toString(), // match loginBtn width
      },
    )
  }

  // Google login handler (using demo creds)
  handleGoogleResponse = async response => {
    try {
      const url = 'https://apis.ccbp.in/login'
      const loginCredintials = {
        username: 'rahul',
        password: 'rahul@2021',
      }

      const options = {
        method: 'POST',
        body: JSON.stringify(loginCredintials),
      }

      const res = await fetch(url, options)
      const data = await res.json()

      if (res.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        const {history} = this.props
        history.replace('/')
      } else {
        this.setState({errorMsg: data.error_msg})
      }
    } catch (err) {
      console.error('Google login failed', err)
    }
  }

  // Normal login
  onsubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  userNameText = event => {
    this.setState({username: event.target.value})
  }

  passwordText = event => {
    this.setState({password: event.target.value})
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to='/' />
    }
    const {errorMsg} = this.state
    return (
      <div className='loginFormBg'>
        <div className='card'>
          <img
            className='logoImg'
            alt='website logo'
            src='https://assets.ccbp.in/frontend/react-js/logo-img.png'
          />
          <form onSubmit={this.onsubmit}>
            <label htmlFor='userName' className='labelText'>
              USERNAME
            </label>
            <br />
            <input
              autoComplete='off'
              id='userName'
              onChange={this.userNameText}
              className='loginInput'
              type='text'
            />
            <br />
            <label htmlFor='passWord' className='labelText'>
              PASSWORD
            </label>
            <br />
            <input
              autoComplete='off'
              id='passWord'
              onChange={this.passwordText}
              className='loginInput'
              type='password'
            />
            <br />
            <button className='loginBtn' type='submit'>
              Login
            </button>
            {errorMsg.length === 0 ? (
              <p></p>
            ) : (
              <p className='errorMsg'>*{errorMsg}</p>
            )}
          </form>

          {/* Separator */}
          <div className='or-separator'>
            <hr className='line' />
            <span>or</span>
            <hr className='line' />
          </div>

          {/* Google Login Button */}
          <div id='googleBtn' style={{marginBottom: '15px'}}></div>
        </div>
      </div>
    )
  }
}
export default LoginForm
