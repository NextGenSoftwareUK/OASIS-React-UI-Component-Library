import React from "react";
import { Link, withRouter } from "react-router-dom";

import logo from "../../assets/images/dummy-logo.svg";
import loginIcon from "../../assets/images/loggedin.png";

class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showProfileDropdown: false,
            shortName: ''
        }

        this.navRef = React.createRef();
    }

    componentDidMount = () => {
        const name = localStorage.getItem("name");
        
        if(name) {
            const words = name.split(' ');
            const fl = words.map(word => word.charAt(0).toUpperCase());
            console.log(fl.join(''))
            // return fl.join('');
            this.setState({
                shortName: fl.join('')
            })
        }

        document.addEventListener('mousedown', this.clickOutsideListener);
    }

    handleUserProfileDropdownClicked = () => {
        this.setState({
            showProfileDropdown: !this.state.showProfileDropdown
        })
    }

    handleLogoutClick = () => {
        // this.setState({
        //     showProfileDropdown: false
        // })
        // this.props.handleLogout();
        this.props.showConfirm();
    }

    handleLogoClicked = () => {
        const { history, showLogin } = this.props;
        history.push('/');

        const jwtToken = localStorage.getItem("jwtToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if(jwtToken || refreshToken) {
        } else {
            showLogin();
        }
    }

    clickOutsideListener = (event) => {
        const navNode = this.navRef.current;
    
        if (navNode && !navNode.contains(event.target)) {
          this.setState({
            showProfileDropdown: false,
          });
        }
    };
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.clickOutsideListener);
    }

    render() {
        const { user, loggedIn, showLogin, showSignup, handleLogout, showSidebar, toggleSidebar, showContactPopup } = this.props;

        const shortName = (this.state.shortName) ? this.state.shortName : this.props.shortName;
        
        const { showProfileDropdown } = this.state;

        return (
            <nav className="nav">
                <div className="nav-left">
                    <div 
                        className={`nav-menu-btn ${showSidebar ? "nav-menu-open" : ""}`} 
                        onClick={toggleSidebar}
                    >
                        <div className="nav-menu-btn-burger"></div>
                    </div>

                    <a className="cursor-pointer" onClick={this.handleLogoClicked}>
                        <img className="nav-logo" src={logo} alt="logo" />
                    </a>
                </div>

                <div className="nav-right">
                    {
                        loggedIn ?

                        <div className="user-profile-container">
                            <p className="username profile-circle" onClick={() => this.handleUserProfileDropdownClicked()}>{shortName}</p>

                            <ul className={"user-profile-dropdown " +(showProfileDropdown ? "show" : "")} ref={this.navRef}>
                                <li>
                                    <div className="user-info">
                                        <p className="username profile-circle">{shortName}</p>

                                        <p>
                                            <span className="name">{user.name}</span>
                                            <span className="email">{user.email}</span>
                                        </p>
                                    </div>
                                </li>
                                <li>View/Edit Avatar</li>
                                <li>Messages</li>
                                <li onClick={showContactPopup}>Contacts</li>
                                <li onClick={() => this.handleLogoutClick()}>Beam Out</li>
                            </ul>
                        </div>

                        : 

                        <ul>
                            <li onClick={showLogin}><a>Beam In</a> </li>
                            <li onClick={showSignup}><a>Sign up</a></li>
                        </ul>
                    }
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar);