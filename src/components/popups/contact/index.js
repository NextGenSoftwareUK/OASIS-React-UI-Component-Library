import React from 'react';
import '../../../assets/scss/contact-popup.scss';
import { Modal } from 'react-bootstrap';

class ContactPopup extends React.Component {
    render() { 
        const { show, hide } = this.props;

        console.log(this.props)

        return (
            <>
                <Modal 
                    centered 
                    className="custom-modal custom-popup-component" 
                    show={show} 
                    onHide={() => hide()}
                >
                    <Modal.Body>
                        <span className="form-cross-icon" onClick={() => hide()}>
                            <i className="fa fa-times"></i>
                        </span>

                        <div className="popup-container default-popup">
                            <div className="data-screen-container">
                                <h1 className="single-heading">Contact</h1>
                                <div className='contactNavbar'>
                                    <ul>
                                        <li>Friends</li>
                                        <li>Colleagues</li>
                                        <li>MyList</li>
                                    </ul>
                                </div>
                                <div>
                                    <button>Send Message</button>
                                    <button>Remove Message</button>
                                </div>
                                
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
 
export default ContactPopup;