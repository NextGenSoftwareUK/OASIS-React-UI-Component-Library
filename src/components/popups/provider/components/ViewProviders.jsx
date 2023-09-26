import React from 'react';
import { Modal } from "react-bootstrap";
import '../../../../assets/scss/coming-soon.scss';
import InfoIcon from '../../../../assets/images/icon-info.svg'
import { AgGridReact } from 'ag-grid-react';
import axios from "axios";
import { toast } from "react-toastify";

class ViewProviders extends React.Component {
    state = {
        columnDefs: [
            {
                fieldName: "provider",
                headerName: "Provider",
            },
            {
                fieldName: "installed",
                headerName: "Installed",
            },
            {
                fieldName: "view",
                headerName: "View",
            },
            {
                fieldName: "running",
                headerName: "Running",
            },
            {
                fieldName: "vpTime",
                headerName: "VPTime"
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
                <Modal
                    size="xl"
                    show={show}
                    dialogClassName=""
                    className="custom-modal custom-popup-component"
                    onHide={() => hide('providers', 'viewProviders')}
                >
                    <Modal.Body className="text-center coming-soon">
                        <span className="form-cross-icon" onClick={() => hide('providers', 'viewProviders')}>
                            <i className="fa fa-times"></i>
                        </span>
                        {/* <img
                            src={InfoIcon}
                            alt="icon"
                        />
                        <h2>UI Coming Soon</h2>
                        <p>You can use this functionality directly by accessing the OASIS API from the Developer menu.</p>
                        <button onClick={() => hide('providers', 'viewProviders')}>OK</button> */}
                        
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
 
export default ViewProviders;