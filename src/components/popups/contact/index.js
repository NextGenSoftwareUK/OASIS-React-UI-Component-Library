import React from 'react';
import '../../../assets/scss/contact-popup.scss';
import { Modal } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';

class ContactPopup extends React.Component {
    state = {
        columnDefs: [
            {
                fieldName: "avatar",
                headerName: "Avatar",
            },
            {
                fieldName: "levelKarma",
                headerName: "Level Karma",
            },
            {
                fieldName: "beamedIn",
                headerName: "Beamed In",
            },
            {
                fieldName: "lastBeamedIn",
                headerName: "Last Beamed In",
            },
            {
                fieldName: "addedToContacts",
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

    render() {
        const { show, hide } = this.props;

        console.log(this.props)

        return (
            <>
                <Modal
                    size="xl"
                    centered
                    className="custom-modal custom-popup-component"
                    show={show}
                    onHide={() => hide()}
                >
                    <Modal.Body>
                        <span className="form-cross-icon" onClick={() => hide()}>
                            <i className="fa fa-times"></i>
                        </span>

                        <div className="popup-container default-popup">
                            <div className="data-screen-container">
                                <h1 className="single-heading">Contact</h1>
                                <div className='contact-navbar'>
                                    <ul>
                                        <li>Friends</li>
                                        <li>Friends</li>
                                        <li>Colleagues</li>
                                        <li>MyList</li>
                                    </ul>
                                </div>
                                
                                <div className="ag-theme-alpine custom-ag-parent">
                                    <AgGridReact
                                        columnDefs={this.state.columnDefs}
                                        defaultColDef={this.state.defaultColDef}
                                        onGridReady={this.onGridReady}
                                        rowData={this.state.rowData}
                                    />
                                </div>

                                <div className='contact-popup-button'>
                                    <button>Send Message</button>
                                    <button>Remove Friends</button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default ContactPopup;