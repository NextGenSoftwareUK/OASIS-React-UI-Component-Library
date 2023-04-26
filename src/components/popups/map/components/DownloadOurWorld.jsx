import React from 'react';
import { Modal } from "react-bootstrap";
import '../../../../assets/scss/coming-soon.scss';
import InfoIcon from '../../../../assets/images/icon-info.svg'

class DownloadOurWorld extends React.Component {
    state = {  } 
    render() { 
        const { show, hide } = this.props;

        return (
            <>
                <Modal
                    size="sm"
                    show={show}
                    dialogClassName=""
                    onHide={() => hide('map', 'downloadOurWorld')}
                >
                    <Modal.Body className="text-center coming-soon">
                        <img
                            src={InfoIcon}
                            alt="icon"
                        />
                        <h2>STAR ODK Coming Soon.</h2>
                        <p>The alpha release of this will be coming soon… please check back soon… thank you.</p>
                        <button onClick={() => hide('map', 'downloadOurWorld')}>OK</button>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
 
export default DownloadOurWorld;