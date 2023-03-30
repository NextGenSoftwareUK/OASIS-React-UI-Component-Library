import React from "react";

import Navbar from "./common/Navbar";
import Sidebar from "./common/sidebar/Sidebar";
import Login from "./Login";
import Signup from "./Signup";
import Solana from "./popups/nft/Solana";
import ContactPopup from "./popups/nft/ContactPopup";
import Karma from "./popups/karma";

import "../assets/scss/general.scss";
import "../assets/scss/style.scss";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "./popups/avatar";
import DataScreen from "./popups/data-screen";
import Seeds from "./popups/seeds";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import VerifyEmail from "./VerifyEmail";
import Game from "./popups/game";
import Eggs from "./popups/eggs";
import Mission from "./popups/mission";
import Quest from "./popups/quest";
import OAPP from "./popups/oapp";
import Map from "./popups/map";
import Provider from "./popups/provider";
import Nft from "./popups/nft";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./ResetPassword";
import SidebarData from "./common/sidebar/SidebarData";

class App extends React.Component {
  state = {
    showSidebar: false,
    showLogin: false,
    showSignup: false,
    showForgetPassword: false,
    user: null,
    loggedIn: false,
    sidebarMenuOption: [
      {
        data: {
          loadData: false,
          sendData: false,
          manageData: false,
          offChainManagement: false,
          crossChainManagement: false,
          searchData: false,
        },
      },
      {
        nft: {
          solana: false,
          contactPopup: false,
        },
      },
      {
        seeds: {
            payWithSeeds: false,
            donateSeeds: false,
            rewardSeeds: false,
            sendInvite: false,
            viewSeeds: false,
            viewOrganizations: false,
            manageSeeds: false,
            searchSeeds: false,
        },
      },
      {
        avatar: {
            viewAvatar: false,
            editAvatar: false,
            searchAvatar: false,
            avatarWallet: false,
        },
      },
      {
        karma: {
            viewKarmaWeightings: false,
            voteKarma: false,
            viewAvatarKarma: false,
            searchKarma: false
        },
      },
      {
        game: {
            viewLeagues: false,
            viewTournaments: false,
            viewAchievements: false,
            searchProfiles: false
        },
      },
      {
        eggs: {
            viewEggs: false,
            manageEggs: false,
            searchEggs: false
        },
      },
      {
        mission: {
            viewMission: false,
            manageMission: false,
            searchMission: false
        },
      },
      {
        quest: {
            viewQuest: false,
            manageQuest: false,
            searchQuest: false
        },
      },
      {
        oapp: {
            installOAPP: false,
            manageOAPP: false,
            createOAPP: false,
            deployOAPP: false,
            editOAPP: false,
            launchOAPP: false,
            searchOAPP: false,
            downloadOurWorld: false,
        }
      },
      {
        map: {
            viewGlobal3dMap: false,
            manageMap: false,
            addQuestToMap: false,
            add2dObjectMap: false,
            add3dObjectMap: false,
            plotRouteOnMap: false,
            viewOappOnMap: false,
            viewHalonsOnMap: false,
            viewQuestOnMap: false,
            searchMap: false,
            downloadOurWorld: false,
        }
      },
      {
        providers: {
            viewProviders: false,
            manageProviders: false,
            manageAutoReplicaton: false,
            manageAutoFailOver: false,
            manageLoadBalancing: false,
            viewProviderStats: false,
            compareProviderSpeeds: false,
            searchProviders: false,
            holochain: false,
            seeds: false,
            eosio: false,
            ethereum: false,
            ipfs: false,
            threeFold: false,
            solid: false,
            activityPub: false,
            mongoDb: false,
            sqlLite: false,
            neo4j: false,
            solana: false
        }
      },
      {
        nft: {
            manageOasisNft: false,
            purchaseOasisNft: false,
            purchaseOasisVirtualLandNft: false,
            searchOasisNft: false,
            viewOasisNft: false
        },
      },
      {
        comingSoon: false,
      }
    ],
  };

    componentDidMount() {
        const jwtToken = localStorage.getItem("jwtToken"); 
        const refreshToken = localStorage.getItem("refreshToken");

        let loggedIn = (jwtToken && refreshToken) ? true : false;
        this.setState({ loggedIn: loggedIn });

        if(loggedIn) {
            let user = {
                email: localStorage.getItem("email"),
                name: localStorage.getItem("name")
            }

            this.setState({
                user: user
            })
        }
    }

    setUserData = (data) => {
        localStorage.setItem("name", data.fullName)
        localStorage.setItem("jwtToken", data.jwtToken)
        localStorage.setItem("refreshToken", data.refreshToken)
        localStorage.setItem("email", data.email)
        
        let user = {
            email: data.email,
            name: data.fullName
        }

        this.setState({
            user: user,
            loggedIn: true
        })
    };

    toggleSidebar = () => {
        this.setState({
            showSidebar: !this.state.showSidebar,
        });
    };

    hidePopups = () => {
        this.setState({
            showLogin: false,
            showSignup: false,
            showForgetPassword: false
        });
    };

    hideLogin = () => {
        this.setState({
            showLogin: false,
        });
    };

    hideSignup = () => {
        this.setState({
            showSignup: false,
        });
    };

    showLogin = () => {
        console.log('going to call login')
        this.setState({
            showLogin: true,
            showSignup: false,
            showForgetPassword: false
        });
    };

    showSignup = () => {
        this.setState({
            showSignup: true,
            showLogin: false,
            showForgetPassword: false
        });
    };

    handleLogout = () => {
        console.log('going to call logout')
        const token = localStorage.getItem("jwtToken");
        const refreshToken = localStorage.getItem("refreshToken");

        console.log(token)
        console.log(refreshToken)
        // axios
        //     .post("https://api.oasisplatform.world/api/avatar/revoke-token", {token: refreshToken}, {
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         }
        //     })
        //     .then((res) => {
        //         this.setState({ user: null });
        //         localStorage.removeItem("user");
        //         localStorage.removeItem("credentials");

        //         localStorage.clear();
        //     })
        //     .catch((err) => {
        //         this.setState({ user: null });
        //         localStorage.removeItem("user");
        //         localStorage.removeItem("credentials");
        //         localStorage.clear();
        //     });
        localStorage.clear();
        this.setState({
            loggedIn: false
        })
    };

    toggleScreenPopup = (menuName, popupName) => {
        let jwtToken = localStorage.getItem("jwtToken");
        let refreshToken = localStorage.getItem("refreshToken");

        let sidebarMenuOption = [...this.state.sidebarMenuOption];

        SidebarData.map((item) => {
            if(item.name === menuName) {
                item.subMenu.map((subItem) => {
                    if(subItem.popupName === popupName) {
                        sidebarMenuOption.map((option) => {
                            if(option[menuName]) {
                                if(subItem.loginRequired) {
                                    if(jwtToken && refreshToken) {
                                        option[menuName][popupName] = !option[menuName][popupName];
                                    } else {
                                        toast.error("You are not currently beamed in, please beam in first.")
                                    }
                                } else {
                                    option[menuName][popupName] = !option[menuName][popupName];
                                }
                            }
                        })
                    }
                })
            }
        })

        this.setState({
            sidebarMenuOption
        })
    };

    render() {
        console.log(window.location.host + '/avatar/verify-email')
        return (
            <Router>
                <Switch>
                {/* window.location.host */}
                    {/* <Route path='/avatar/verify-email' component={VerifyEmail} />
                    <Route path='/avatar/reset-password' component={ResetPassword} /> */}
                    <Route path={window.location.host + '/avatar/verify-email'} component={VerifyEmail} />
                    <Route path={window.location.host + '/avatar/reset-password'} component={ResetPassword} />
                </Switch>

                <ToastContainer position="top-center" />

                <div className="main-container">
                    <header>
                        <Navbar
                            showSidebar={this.state.showSidebar}
                            toggleSidebar={this.toggleSidebar}
                            showLogin={this.showLogin}
                            showSignup={this.showSignup}
                            handleLogout={this.handleLogout}
                            loggedIn={this.state.loggedIn}
                            user={this.state.user}
                        />
                        
                        <Sidebar
                            showSidebar={this.state.showSidebar}
                            toggleSidebar={this.toggleSidebar}
                            toggleScreenPopup={this.toggleScreenPopup}
                        />
                    </header>

                    <Login
                        className="custom-form"
                        show={this.state.showLogin}
                        hide={this.hideLogin}
                        change={this.showSignup}
                        setUserStateData={this.setUserData}
                    />

                    <Signup
                        className="custom-form"
                        show={this.state.showSignup}
                        hide={this.hideSignup}
                        change={this.showLogin}
                        showLogin={this.showLogin}
                    />

                    <DataScreen
                        data={this.state.sidebarMenuOption[0].data}
                        toggleScreenPopup={this.toggleScreenPopup}
                    />

                    <Solana
                        show={this.state.sidebarMenuOption[1].nft.solana}
                        hide={this.toggleScreenPopup}
                    />

                    <ContactPopup
                        show={this.state.sidebarMenuOption[1].nft.contactPopup}
                        hide={this.toggleScreenPopup}
                    />

                    <Seeds
                        seeds={this.state.sidebarMenuOption[2].seeds}
                        toggleScreenPopup={this.toggleScreenPopup}
                    />
                    
                    <Avatar
                        avatar={this.state.sidebarMenuOption[3].avatar}
                        toggleScreenPopup={this.toggleScreenPopup}
                    />

                    <Karma 
                        karma={this.state.sidebarMenuOption[4].karma}
                        toggleScreenPopup={this.toggleScreenPopup}
                    />

                    <Game 
                        game={this.state.sidebarMenuOption[5].game}
                        toggleScreenPopup={this.toggleScreenPopup}
                    />

                    <Eggs 
                        eggs={this.state.sidebarMenuOption[6].eggs}
                        toggleScreenPopup={this.toggleScreenPopup}
                    />

                    <Mission 
                        mission={this.state.sidebarMenuOption[7].mission}
                        toggleScreenPopup={this.toggleScreenPopup}
                    />

                    <Quest 
                        quest={this.state.sidebarMenuOption[8].quest}
                        toggleScreenPopup={this.toggleScreenPopup}
                    />

                    <OAPP 
                        oapp={this.state.sidebarMenuOption[9].oapp}
                        toggleScreenPopup={this.toggleScreenPopup}
                    />

                    <Map 
                        map={this.state.sidebarMenuOption[10].map}
                        toggleScreenPopup={this.toggleScreenPopup}
                    />

                    <Provider 
                        providers={this.state.sidebarMenuOption[11].providers}
                        toggleScreenPopup={this.toggleScreenPopup}
                    />

                    <Nft
                        nft={this.state.sidebarMenuOption[12].nft}
                        toggleScreenPopup={this.toggleScreenPopup}
                    />

                    {/* <ComingSoon
                        show={this.state.sidebarMenuOption[5].comingSoon}
                        toggleScreenPopup={this.toggleScreenPopup}
                    /> */}
                </div>
            </Router>
        );
    }

}

export default App;
