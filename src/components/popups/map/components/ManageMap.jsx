import React from 'react';
import { Modal } from "react-bootstrap";
import '../../../../assets/scss/coming-soon.scss';
import InfoIcon from '../../../../assets/images/icon-info.svg'

class ManageMap extends React.Component {
    state = {  } 
    render() { 
        const { show, hide } = this.props;

        return (
            <>
                <Modal
                    size="sm"
                    show={show}
                    dialogClassName=""
                    onHide={() => hide('map', 'manageMap')}
                >
                    <Modal.Body className="text-center coming-soon">
                        <img
                            src={InfoIcon}
                            alt="icon"
                        />
                        <h2>Our World Coming Soon.</h2>
                        <p>This is functionaliy that is built in the Unity Smartphone Prototype for Our World and will soon be released. You can then download Our World from either the Map or OAPP menu.</p>
                        <button onClick={() => hide('map', 'manageMap')}>OK</button>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
 
export default ManageMap;