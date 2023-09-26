import React from 'react';

import { Modal } from 'react-bootstrap';
import ProviderDropdown from '../../../common/ProviderDropdown';
import axios from "axios";
import { toast } from 'react-toastify';

class AddData extends React.Component {

    getApiData = () => {
        this.setState({ loading: true })

        axios({
            method: 'post',
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
                    className="custom-modal custom-popup-component" 
                    show={show} 
                    onHide={() => hide('data','sendData')}
                >
                    <Modal.Body>
                        <span className="form-cross-icon" onClick={() => hide('data', 'sendData')}>
                            <i className="fa fa-times"></i>
                        </span>

                        <div className="popup-container default-popup">
                            <div className="data-screen-container">
                                <h1 className="single-heading">Data</h1>

                                <div className="form-container">
                                    <form>
                                        <ProviderDropdown />

                                        <p className="single-form-row">
                                            <label>Json: </label>
                                            <textarea></textarea>
                                        </p>

                                        <p className="single-form-row">
                                            <label>File: </label>
                                            <input type="file" />
                                        </p>

                                        <p className="single-form-row">
                                            <button 
                                                className="submit-button sm-button" 
                                                type="submit"
                                            >Save</button>
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
 
export default AddData;