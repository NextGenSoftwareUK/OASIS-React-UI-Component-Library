import React from "react";
import { Modal } from "react-bootstrap";
import '../../../assets/scss/coming-soon.scss';
import InfoIcon from '../../../assets/images/icon-info.svg';

class Confirmation extends React.Component {
    render() {
        return (
            <Modal
                size="sm"
                show={this.props.show}
                onHide={this.props.hide}
            >
                <Modal.Body className="text-center coming-soon">
                    <img
                        src={InfoIcon}
                        alt="icon"
                    />
                    <h2>Are you Sure?</h2>
                    <p>Are you sure you want to Beam out?</p>

                    <button onClick={this.props.hide}>Cancel</button>
                    <button onClick={this.props.logout}>Beam out</button>
                </Modal.Body>
            </Modal>
        );
    }
}

export default Confirmation;
