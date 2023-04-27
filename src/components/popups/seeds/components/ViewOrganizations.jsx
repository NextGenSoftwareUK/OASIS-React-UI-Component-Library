import React from 'react';
import { Modal } from "react-bootstrap";
import '../../../../assets/scss/coming-soon.scss';
import InfoIcon from '../../../../assets/images/icon-info.svg';

import axios from "axios";

class ViewOrganizations extends React.Component {
    state = {
        columnDefs: [
            { 
                field: 'athlete'
            },
            {
                field: 'age',
                filter: 'agNumberColumnFilter',
                maxWidth: 100,
            },
            { field: 'country' },
            {
                field: 'year',
                maxWidth: 100,
            },
            {
                field: 'date',
                filter: 'agDateColumnFilter',
            },
            { field: 'sport' },
            {
                field: 'gold',
                filter: 'agNumberColumnFilter',
            },
            {
                field: 'silver',
                filter: 'agNumberColumnFilter',
            },
            {
                field: 'bronze',
                filter: 'agNumberColumnFilter',
            },
            {
                field: 'total',
                filter: false,
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
    
    loadDataFromApi = () => {
        const jwtToken = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        };

        axios.get('https://api.oasisplatform.world/api/seeds/get-all-organisations', { headers })
        .then(response => {
            console.log(response)
            // if(response.data.isError) {
            //     toast.error(response.data.message)
            // } else {
            //     toast.success(response.data.result.message)
            // }
            // // this.props.history.goBack()
            // // console.log(this.props) 
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() { 
        const { show, hide } = this.props;

        if(show) {
            this.loadDataFromApi();
        }

        return (
            <>
                <Modal
                    size="sm"
                    show={show}
                    dialogClassName=""
                    onHide={() => hide('seeds', 'viewOrganizations')}
                >
                    <Modal.Body className="text-center coming-soon">
                        <img
                            src={InfoIcon}
                            alt="icon"
                        />
                        <h2>UI Coming Soon</h2>
                        <p>You can use this functionality directly by accessing the OASIS API from the Developer menu.</p>
                        <button onClick={() => hide('seeds', 'viewOrganizations')}>OK</button>
                    </Modal.Body>
                </Modal>

                {/* <Modal 
                    centered 
                    className="custom-modal custom-popup-component light-custom-popup" 
                    show={show}
                    dialogClassName=""
                    onHide={() => hide('data', 'loadData')}
                >
                    <Modal.Body>
                        <span className="form-cross-icon" onClick={() => hide('seeds', 'viewOrganizations')}>
                            <i className="fa fa-times"></i>
                        </span>

                        <h1 className="single-heading">Data</h1>

                        <div className="ag-theme-alpine custom-ag-parent">
                            <AgGridReact
                                columnDefs={this.state.columnDefs}
                                defaultColDef={this.state.defaultColDef}
                                onGridReady={this.onGridReady}
                                rowData={this.state.rowData}
                            />
                        </div>
                    </Modal.Body>
                </Modal> */}
            </>
        );
    }
}
 
export default ViewOrganizations;