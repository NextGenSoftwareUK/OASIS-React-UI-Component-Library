import React from 'react';
import { Modal } from "react-bootstrap";
import '../../../../assets/scss/coming-soon.scss';
import InfoIcon from '../../../../assets/images/icon-info.svg'

class SearchSeeds extends React.Component {
    state = {  } 
    render() { 
        const { show, hide } = this.props;

        return (
            <>
                <Modal
                    size="lg"
                    show={show}
                    dialogClassName="modal-90w"
                    onHide={() => hide('seeds', 'searchSeeds')}
                >
                    <Modal.Body className="seed-modal">
                        <div className="heading">
                            <h2>Search Seeds</h2>
                        </div>

                        <div className="custom-form d-grid grid-gap-20">
                            <div className="d-flex justify-content-between">
                                <div className="form-field">
                                    <label>Avatar:</label>
                                    <input type="text" />
                                </div>

                                <div className="form-field">
                                    <label>Seed Username:</label>
                                    <input type="text" />
                                </div>
                            </div>

                            <div className="d-flex justify-content-between">
                                <div className="form-field">
                                    <label>From Date:</label>
                                    <input type="text" />
                                </div>

                                <div className="form-field">
                                    <label>To Date:</label>
                                    <input type="text" />
                                </div>
                            </div>

                            <div className="d-flex grid-gap-20 justify-content-end">
                                <button className="white-button submit-button" onClick={() => hide('seeds', 'searchSeeds')}>Cancel</button>
                                <button className="submit-button">Search</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
 
export default SearchSeeds;