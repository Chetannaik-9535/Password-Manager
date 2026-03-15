// Write code here
import {Component} from 'react'

import './PasswordItem.css'

class PasswordManagerApp extends Component {
  state = {}

  render() {
    return (
      <div className="App-main-Container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="PasswordManager-card-container">
          <div className="UserInput-card-container"></div>
        </div>
      </div>
    )
  }
}

export default PasswordManagerApp
