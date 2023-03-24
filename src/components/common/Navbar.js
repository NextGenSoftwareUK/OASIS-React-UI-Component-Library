import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/dummy-logo.svg";
import loginIcon from "../../assets/images/loggedin.png";

class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showProfileDropdown: false
        }
    }

    handleUserProfileDropdownClicked = () => {
        this.setState({
            showProfileDropdown: !this.state.showProfileDropdown
        })
    }

    handleLogoutClick = () => {
        this.setState({
            showProfileDropdown: false
        })
        this.props.handleLogout();
    }

    handleLogoClicked = (showLogin) => {
        // const { history } = this.props;
        // console.log(this.props)
        // history.push('/');

        const jwtToken = localStorage.getItem("jwtToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if(jwtToken || refreshToken) {
        } else {
            showLogin();
        }
    }

    render() {
        const { user, loggedIn, showLogin, showSignup, handleLogout, showSidebar, toggleSidebar } = this.props;
        // console.log(user)
        return (
            <nav className="nav">
                <div className="nav-left">
                    <div 
                        className={`nav-menu-btn ${showSidebar ? "nav-menu-open" : ""}`} 
                        onClick={toggleSidebar}
                    >
                        <div className="nav-menu-btn-burger"></div>
                    </div>

                    <a className="cursor-pointer" onClick={() => this.handleLogoClicked(showLogin)}>
                        <img className="nav-logo" src={logo} alt="logo" />
                    </a>
                </div>

                <div className="nav-right">
                    {
                        loggedIn ?

                        <div className="user-profile-container">
                            <p className="username profile-circle" onClick={() => this.handleUserProfileDropdownClicked()}>MA</p>

                            {
                                this.state.showProfileDropdown ?
                                <ul className="user-profile-dropdown">
                                    <li>
                                        <div className="user-info">
                                            <p className="username profile-circle">MA</p>

                                            <p>
                                                <span className="name">{user.name}</span>
                                                <span className="email">{user.email}</span>
                                            </p>
                                        </div>
                                    </li>
                                    <li>My Account</li>
                                    <li>My Profile</li>
                                    <li onClick={() => this.handleLogoutClick()}>Logout</li>
                                </ul>

                                : null
                            }
                        </div>

                        : 

                        <ul>
                            {/* <li><a><Link to='/avatar/reset-password'>Reset</Link></a> </li> */}
                            
                            <li onClick={showLogin}><a>Log in</a> </li>
                            <li onClick={showSignup}><a>Sign up</a></li>
                        </ul>
                    }
                </div>
            </nav>
        );
    }
}

export default Navbar;