import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/dummy-logo.svg";
import loginIcon from "../../assets/images/loggedin.png";

class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showProfileDropdown: false,
            shortName: ''
        }
    }

    componentDidMount = () => {
        const name = localStorage.getItem("name");
        console.log(name)
        if(name) {
            const words = name.split(' ');
            const fl = words.map(word => word.charAt(0).toUpperCase());
            console.log(fl.join(''))
            // return fl.join('');
            this.setState({
                shortName: fl.join('')
            })
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
                            <p className="username profile-circle" onClick={() => this.handleUserProfileDropdownClicked()}>{this.state.shortName}</p>

                            {
                                this.state.showProfileDropdown ?
                                <ul className="user-profile-dropdown">
                                    <li>
                                        <div className="user-info">
                                            <p className="username profile-circle">{this.state.shortName}</p>

                                            <p>
                                                <span className="name">{user.name}</span>
                                                <span className="email">{user.email}</span>
                                            </p>
                                        </div>
                                    </li>
                                    <li>View/Edit Avatar</li>
                                    <li>Messages</li>
                                    <li>Contacts</li>
                                    <li onClick={() => this.handleLogoutClick()}>Beam Out</li>
                                </ul>

                                : null
                            }
                        </div>

                        : 

                        <ul>
                            {/* <li><a><Link to='/avatar/reset-password'>Reset</Link></a> </li> */}
                            
                            <li onClick={showLogin}><a>Beam in</a> </li>
                            <li onClick={showSignup}><a>Sign up</a></li>
                        </ul>
                    }
                </div>
            </nav>
        );
    }
}

export default Navbar;