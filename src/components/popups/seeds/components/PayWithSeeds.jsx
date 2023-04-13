import React from 'react';

import { Modal } from 'react-bootstrap';
import axios from "axios";
import { toast } from "react-toastify";

class PayWithSeeds extends React.Component {

    constructor() {
        console.log('Going to show Pay with Seeds');
        super()
        this.state = {
            group: '',
            avatar: '',
            seedUser: '',
            amount: '',
            note: '',

            avatar: {
                enabled: true,
                name: ''
            },
            seed: {
                enabled: false,
                username: '',
                amount: 0
            },
            note: ''
        }
    }

    componentDidMount = () => {
        // this.loadAllAvatarData();
    }

    loadAllAvatarData = () => {
        const jwtToken = localStorage.getItem('jwtToken');

        const headers = {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        };

        console.log('going to load all avatars ')
        axios.get('https://api.oasisplatform.world/api/avatar/get-all-avatars', { headers })
        .then(response => {
            console.log(response)
            if(response.data.isError) {
                toast.error(response.data.message)
            } else {
                toast.success(response.data.result.message)
            }
            // this.props.history.goBack()
            // console.log(this.props) 
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleChange = (e) => {
        console.log(e.target.value)

        if(e.target.value === "avatar_section") {
            this.setState({
                avatar: {
                    enabled: true
                },
                seed: {
                    enabled: false
                }
            })
        } else if(e.target.value === "seed_section") {
            this.setState({
                avatar: {
                    enabled: false
                },
                seed: {
                    enabled: true
                }
            })
        }

        // if(e.target.value === "avatar_section" || e.target.value === "seed_section") {
        //     this.setState({
        //         group: e.target.value
        //     })
        // } else {
        //     this.setState({[e.target.name]: e.target.value})
        // }
    }

    handleSubmit=(e) => {
      e.preventDefault()
    }

    render() {
        const { show, hide } = this.props;
        if(show) {
            this.loadAllAvatarData();
        }
        return (
            <>
                <Modal
                    centered
                    className="custom-modal custom-popup-component"
                    show={show}
                    onHide={() => hide('seeds', 'payWithSeeds')}
                >
                    <Modal.Body>
                        <span className="form-cross-icon" onClick={() => hide('seeds', 'payWithSeeds')}>
                            <i className="fa fa-times"></i>
                        </span>

                        <div className="popup-container default-popup">
                            <div className="seed-container paywith-seeds">
                                <h1 className="single-heading">
                                    Pay with Seeds
                                </h1>

                                <div className="form-container">
                                    <form onSubmit={this.handleSubmit}>
                                        <p className="single-form-row">
                                            <label className="single-radio-btn">
                                                <input 
                                                    type="radio" 
                                                    value="avatar_section" 
                                                    checked={this.state.avatar.enabled} 
                                                    onChange={this.handleChange} 
                                                />
                                                Avatar
                                            </label>

                                            <input 
                                                type="text" 
                                                placeholder="Avatar" 
                                                name="avatar" 
                                                value={this.state.avatar.name} 
                                                onChange={this.handleChange}
                                                disabled={!this.state.avatar.enabled} 
                                            />
                                        </p>

                                        <h3>OR</h3>

                                        <p className="single-form-row">
                                            <label className="single-radio-btn">
                                                <input 
                                                    type="radio" 
                                                    value="seed_section"
                                                    checked={this.state.seed.enabled} 
                                                    onChange={this.handleChange}  
                                                />
                                                Seed Username
                                            </label>

                                            <input 
                                                type="text" 
                                                name="username" 
                                                value={this.state.seed.username} 
                                                onChange={this.handleChange} 
                                                placeholder="Seed Username"
                                                disabled={!this.state.seed.enabled} 
                                            />
                                        </p>

                                        <p className="single-form-row">
                                            <label>Amount</label>
                                            <input 
                                                type="number" 
                                                name="amount" 
                                                value={this.state.seed.amount} 
                                                onChange={this.handleChange}
                                                placeholder="Amount"
                                                disabled={!this.state.seed.enabled}   
                                            />
                                        </p>

                                        <p className="single-form-row mb-30">
                                            <label>Note</label>
                                            <input 
                                                type="text" 
                                                name="note" 
                                                value={this.state.note} 
                                                onChange={this.handleChange}
                                                placeholder="Note"  
                                            />
                                        </p>

                                        <p className="single-form-row btn-right">
                                            <button
                                                className="sm-button"
                                                type="submit"
                                            >Pay</button>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default PayWithSeeds;
