import React from 'react';
import { Modal } from 'react-bootstrap';
import '../../../../assets/scss/avatar-popup.scss';
import { AgGridReact } from 'ag-grid-react';
import axios from "axios";
import { toast } from 'react-toastify';

class AvatarWallet extends React.Component {
    state = {
        columnDefs: [
            {
                fieldName: "date",
                headerName: "Date",
            },
            {
                fieldName: "note",
                headerName: "Note",
            },
            {
                fieldName: "fromAvatar",
                headerName: "From Avatar",
            },
            {
                fieldName: "fromWallet",
                headerName: "From Wallet",
            },
            {
                fieldName: "token",
                headerName: "Token"
            },
            {
                fieldName: "amount",
                headerName: "Amount"
            },
            {
                fieldName: "balance",
                headerName: "Balance"
            },
            {
                fieldName: "provider",
                headerName: "Provider"
            },
            {
                fieldName: "type",
                headerName: "Type"
            }
        ],
        defaultColDef: {
            flex: 1,
            minWidth: 150,
            filter: true,
            sortable: true,
            floatingFilter: true,
            resizable: true,
        },
        rowData: null,
        loading: true,
        loggedIn: true,
    };

    onGridReady = async (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    getApiData = () => {
        this.setState({ loading: true })

        axios({
            method: 'get',
            url: 'https://api.oasisplatform.world/api/',
            headers: {
                'Content-Type': 'application/json'
            }, 
        })
        .then((response) => {
            this.setState({loading: false})

            if (response.data.result?.isError) { 
                toast.error(response.data.result.message);
                return; 
            }

            toast.success(response.data.result.message);
        })
        .catch((err) => {
            toast.error('err');
            this.setState({loading: false})
            return { error: true, data: err };
        });
    }

    render() {
        const { show, hide } = this.props;

        return (
            <>
                {/* <Modal
                    centered
                    className="custom-modal custom-popup-component w-100 "
                    show={show}
                    onHide={() => hide('avatar', 'avatarWallet')}
                >
                    <Modal.Body>
                        <span className="form-cross-icon" onClick={() => hide('avatar', 'avatarWallet')}>
                            <i className="fa fa-times"></i>
                        </span>

                        <div className="page new-skin">
                            <div className="container opened" data-animation-in="fadeInLeft" data-animation-out="fadeOutLeft">
                                
                                    <h1 class="single-heading">Avatar Wallet</h1>    
                                
                                <div className="card-started" id="home-card">
                                    
                                    <div className="profile no-photo">
                                        <div className="slide" />
                                        <div className="title">Username</div>
                                        <div className="subtitle"> User Level </div>
                                        <div className="lnks">
                                            <a href="#" className="lnk">
                                                <span className="text">2D Avatar</span>
                                            </a>
                                            <a href="#" className="lnk discover">
                                                <span className="text">3d Avatar</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </Modal.Body>
                </Modal> */}

                <Modal
                    size="xl"
                    centered
                    className="custom-modal custom-popup-component"
                    show={show}
                    onHide={() => hide('avatar', 'avatarWallet')}
                >
                    <Modal.Body>
                        <span className="form-cross-icon" onClick={() => hide('avatar', 'avatarWallet')}>
                            <i className="fa fa-times"></i>
                        </span>

                        <div className="popup-container default-popup">
                            <div className="data-screen-container">
                                
                                <div className="ag-theme-alpine custom-ag-parent">
                                    <AgGridReact
                                        columnDefs={this.state.columnDefs}
                                        defaultColDef={this.state.defaultColDef}
                                        onGridReady={this.onGridReady}
                                        rowData={this.state.rowData}
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default AvatarWallet;