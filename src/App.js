// Importing Component class from React to create a class-based component
import { Component } from 'react'
// Importing uuid to generate unique IDs for each password entry
import { v4 as uuidv4 } from 'uuid'
// Importing external CSS for styling
import './App.css'

// Class component definition
class App extends Component {
  // Initial state: this is where all dynamic data for the app is stored
  state = {
    website: '',            // To store website name input
    username: '',           // To store username input
    password: '',           // To store password input
    searchInput: '',        // To store the search field input
    userInputList: [],      // To store all user-entered password objects
    isShowPassword: false,  // Toggle to show/hide passwords
  }

  // Predefined color list for random avatar background colors
  bgColors = [
    '#b91c1c',
    '#14b8a6',
    '#f97316',
    '#10b981',
    '#f59e0b',
    '#7683cb',
    '#0b69ff',
    '#0ea5e9',
    '#64748b',
  ]

  // ✅ Function triggered when user clicks “Add” (form submit)
  onClickAddUserInput = event => {
    event.preventDefault() // Prevents page reload on form submit

    const { website, username, password } = this.state // Extract values from state

    // Create a new password entry object
    const newContact = {
      id: uuidv4(),  // unique id
      website,
      username,
      password,
    }

    // Add new entry to the list and reset the input fields
    this.setState(prevState => ({
      userInputList: [...prevState.userInputList, newContact],
      website: '',
      username: '',
      password: '',
    }))
  }

  // ✅ Controlled input handlers - keep UI and state in sync
  onChangeWebsite = event => {
    this.setState({ website: event.target.value })
  }

  onChangeUsername = event => {
    this.setState({ username: event.target.value })
  }

  onChangePassword = event => {
    this.setState({ password: event.target.value })
  }

  onChangeSearchInput = event => {
    this.setState({ searchInput: event.target.value })
  }

  // ✅ Filter passwords based on search input
  getFilteredPasswordList = () => {
    const { userInputList, searchInput } = this.state
    return userInputList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase())
    )
  }

  // ✅ Delete a password entry by id
  deletePassword = id => {
    this.setState(prevState => ({
      userInputList: prevState.userInputList.filter(
        eachPassword => eachPassword.id !== id
      ),
    }))
  }

  // ✅ Toggle visibility of passwords
  toggleOnChangePassword = () => {
    this.setState(prevState => ({
      isShowPassword: !prevState.isShowPassword,
    }))
  }

  // ✅ Pick a random background color for each user's first letter circle
  getBgColor = () => {
    const randomIndex = Math.floor(Math.random() * this.bgColors.length)
    return this.bgColors[randomIndex]
  }

  // ✅ render() returns the UI
  render() {
    // Extracting values from state
    const { website, username, password, userInputList, searchInput, isShowPassword } =
      this.state

    // Get filtered passwords based on search
    const filteredPasswordList = this.getFilteredPasswordList()

    return (
      <div className="App-main-Container">
        {/* Top logo */}
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />

        {/* Input form section */}
        <div className="PasswordManager-card-container">
          <div className="UserInput-card-container">
            <p className="title">Add New Password</p>

            {/* The form where user inputs website, username, and password */}
            <form onSubmit={this.onClickAddUserInput}>
              {/* Website input */}
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  className="image"
                  alt="website"
                />
                <input
                  type="text"
                  value={website}
                  onChange={this.onChangeWebsite}
                  className="Input"
                  placeholder="Enter Website"
                />
              </div>

              {/* Username input */}
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  className="image"
                  alt="username"
                />
                <input
                  type="text"
                  value={username}
                  onChange={this.onChangeUsername}
                  className="Input"
                  placeholder="Enter Username"
                />
              </div>

              {/* Password input */}
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  className="image"
                  alt="password"
                />
                <input
                  type="password"
                  value={password}
                  onChange={this.onChangePassword}
                  className="Input"
                  placeholder="Enter Password"
                />
              </div>

              {/* Submit button */}
              <div className="button-container">
                <button className="button" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>

          {/* Right-side illustration */}
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="container-image"
            alt="password manager"
          />
        </div>

        {/* Password list section */}
        <div className="PasswordManagerListItem-card-container">
          {/* Top bar with count and search */}
          <div className="navbar-container">
            <p className="top-title">Your Passwords: {userInputList.length}</p>
            <div className="navbar-search-input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="image"
                alt="search"
              />
              <input
                className="Input"
                type="search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                placeholder="Search"
              />
            </div>
          </div>

          <hr className="horizontal-line" />

          {/* Checkbox to show/hide passwords */}
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="check"
              className="checkbox"
              onChange={this.toggleOnChangePassword}
            />
            <label className="description" htmlFor="check">
              Show Passwords
            </label>
          </div>

          {/* Conditional rendering: if no passwords, show image */}
          {filteredPasswordList.length === 0 ? (
            <div className="Nopasswordmanager-image">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="container-image"
              />
              <p className="title">No Passwords</p>
            </div>
          ) : (
            <ul className="unorder-list">
              {/* Map through filtered passwords */}
              {filteredPasswordList.map(eachItem => (
                <li key={eachItem.id} className="password-List-container">
                  <div className="input-List-container">
                    <p
                      className="user-first-letter"
                      style={{ backgroundColor: this.getBgColor() }}
                    >
                      {eachItem.username[0].toUpperCase()}
                    </p>
                    <div>
                      <p>{eachItem.website}</p>
                      <p>{eachItem.username}</p>
                      {/* Conditionally show password or stars */}
                      <p>
                        {isShowPassword ? (
                          eachItem.password
                        ) : (
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                            alt="stars"
                            className="stars"
                          />
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    type="button"
                    data-testid="delete"
                    onClick={() => this.deletePassword(eachItem.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="image"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App


