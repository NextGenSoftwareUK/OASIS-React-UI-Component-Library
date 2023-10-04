import React from 'react';

import { Modal } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';
import axios from "axios";
import { toast } from "react-toastify";

var filterParams = {
    comparator: function (filterLocalDateAtMidnight, cellValue) {
        var dateAsString = cellValue;
        if (dateAsString === null) return -1;
        var dateParts = dateAsString.split('/');
        var cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
        );
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
        }
        if (cellDate < filterLocalDateAtMidnight) {
            return -1;
        }
        if (cellDate > filterLocalDateAtMidnight) {
            return 1;
        }
    },
    browserDatePicker: true,
};

class ViewSeeds extends React.Component {

    state = {
        sentSeedsColumnDefs: [
            {
                headerName: 'Date', 
                field: 'date' 
            },
            {
                headerName: 'To Avatar', 
                field: 'toAvatar' 
            },
            {
                headerName: 'To Seeds Account No', 
                field: 'toSeedsAccountNo' 
            },
            {
                headerName: 'Type', 
                field: 'type' 
            },
            { 
                headerName: 'Amount',
                field: 'amount' 
            },
            {
                headerName: 'Karma Earnt', 
                field: 'karmaEarnt' 
            },
            { 
                headrName: 'Bages Earnt',
                field: 'bagesEarnt' 
            }
        ],

        receivedSeedsColumnDefs: [
            {
                headerName: 'Date', 
                field: 'date' 
            },
            {
                headerName: 'Fom Avatar', 
                field: 'fromAvatar' 
            },
            {
                headerName: 'From Seeds Account No', 
                field: 'fromSeedsAccountNo' 
            },
            {
                headerName: 'Type', 
                field: 'type' 
            },
            { 
                headerName: 'Amount',
                field: 'amount' 
            },
            {
                headerName: 'Karma Earnt', 
                field: 'karmaEarnt' 
            },
            { 
                headrName: 'Bages Earnt',
                field: 'bagesEarnt' 
            }
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
                    dialogClassName=""
                    onHide={() => hide('seeds', 'viewSeeds')}
                >
                    <Modal.Body>
                        <span className="form-cross-icon" onClick={() => hide('seeds', 'viewSeeds')}>
                            <i className="fa fa-times"></i>
                        </span>

                        <h1 className="single-heading">View Seeds</h1>

                        <p>Your Seeds: 2222</p>
                        <p>Karma: 777</p>

                        <div className="grids-container">
                            <div className="single-grid">
                                <p className="heading">Seeds Sent</p>

                                <div className="ag-theme-alpine custom-ag-parent">
                                    <AgGridReact
                                        columnDefs={this.state.sentSeedsColumnDefs}
                                        defaultColDef={this.state.defaultColDef}
                                        onGridReady={this.onGridReady}
                                        rowData={this.state.rowData}
                                    />
                                </div>
                            </div>

                            <div className="single-grid">
                                <p className="heading">Seeds Received</p>

                                <div className="ag-theme-alpine custom-ag-parent">
                                    <AgGridReact
                                        columnDefs={this.state.receivedSeedsColumnDefs}
                                        defaultColDef={this.state.defaultColDef}
                                        onGridReady={this.onGridReady}
                                        rowData={this.state.rowData}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="btn-container three-btn-container">
                            <div className="single-btn">
                                <button>Pay with Seeds</button>
                            </div>

                            <div className="single-btn">
                                <button>Donate with Seeds</button>
                            </div>

                            <div className="single-btn">
                                <button>Reward with Seeds</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
 
export default ViewSeeds;