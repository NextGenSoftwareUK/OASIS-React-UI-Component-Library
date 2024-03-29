import React from 'react';
import { Modal } from "react-bootstrap";
import '../../../../assets/scss/coming-soon.scss';
import InfoIcon from '../../../../assets/images/icon-info.svg'

import axios from "axios";
import { toast } from 'react-toastify';
import { AgGridReact } from 'ag-grid-react';

class ViewAvatarKarma extends React.Component {
    state = {
        columnDefs: [
            { 
                field: "date",
                headerName: "Date"
            },
            {
                field: 'level',

            },
            { 
                field: "type",
                headerName: "Type"
            },
            {
                field: "karma",
                headerName: "Karma",
            },
            {
                field: "source",
                headerName: "Source" 
            },
            {
                field: "title",
                headerName: "Title" 
            },
            {
                field: "description",
                headerName: "Description" 
            },
            {
                field: "weblink",
                headerName: "Weblink" 
            },
        ],
        defaultColDef: {
            flex: 1,
            minWidth: 150,
            filter: true,
            sortable: true,
            floatingFilter: true,
            resizable: true,
            // overflow:true
        },
        rowData: null,
    };

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    
        const updateData = (data) => {
          this.setState({ rowData: data });
        };
    
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
          .then((resp) => resp.json())
          .then((data) => updateData(data));
    };

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
                    centered 
                    className="custom-modal custom-popup-component light-custom-popup" 
                    show={show}
                    onHide={() => hide('karma', 'viewAvatarKarma')}
                >
                    <Modal.Body>
                        <span className="form-cross-icon" onClick={() => hide('karma', 'viewAvatarKarma')}>
                            <i className="fa fa-times"></i>
                        </span>

                        <h1 className="single-heading">Karma</h1>

                        <div className="grids-container">
                            <div className="single-grid">
                                <p className="heading">Seeds Sent</p>

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
 
export default ViewAvatarKarma;