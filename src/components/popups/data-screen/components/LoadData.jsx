import React from 'react';

import { Modal } from 'react-bootstrap';
import axios from "axios";
import { toast } from 'react-toastify';
import { AgGridReact } from 'ag-grid-react';

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

class LoadData extends React.Component {

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
                filterParams: filterParams,
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
                    centered 
                    className="custom-modal custom-popup-component light-custom-popup" 
                    show={show}
                    dialogClassName=""
                    onHide={() => hide('data', 'loadData')}
                >
                    <Modal.Body>
                        <span className="form-cross-icon" onClick={() => hide('data', 'loadData')}>
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
                </Modal>
            </>
        );
    }
}
 
export default LoadData;