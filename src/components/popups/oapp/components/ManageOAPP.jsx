import React from 'react';
import { Modal } from "react-bootstrap";
import '../../../../assets/scss/coming-soon.scss';
import InfoIcon from '../../../../assets/images/icon-info.svg'

class ManageOAPP extends React.Component {
    state = {  } 
    render() { 
        const { show, hide } = this.props;

        return (
            <>
                <Modal
                    size="md"
                    show={show}
                    dialogClassName=""
                    onHide={() => hide('oapp', 'manageOAPP')}
                >
                    <Modal.Body className="">
                        <div className="popup-heading">
                            <h3>OAPPS INSTALLED</h3>
                        </div>

                        <div className="all-oaps-data">
                            <div>
                                <p>hAPP: 5</p>
                                <p>SOLID: 3</p>
                                <p>ETH: 7</p>
                                <p>WEB: 3</p>
                            </div>

                            <p>Total: 18</p>
                        </div>

                        <div className="all-oaps-table">
                            <div className="oapp-table-heading">
                                <p>OAPP</p>
                                <p>Installed</p>
                                <p>Version</p>
                                <p>Type</p>
                            </div>

                            <div className="oapp-table-data">
                                <div className="oapp-table-row">
                                    <div className="oapp-single-row">
                                        <p>Our World</p>
                                        <p>01/01/2023</p>
                                        <p>Alpha 0.01</p>
                                        <p>hApp</p>
                                    </div>

                                    <div className="oapp-single-row">
                                        <p>Our World</p>
                                        <p>01/01/2023</p>
                                        <p>Alpha 0.01</p>
                                        <p>hApp</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
 
export default ManageOAPP;