import React from 'react';
import '../../../assets/scss/contact-popup.scss';
import { Modal } from 'react-bootstrap';

class ContactPopup extends React.Component {
    state = {
        columnDefs: [
           {
                headerName: 'Avatar',
           },
           {
                headerName: 'Level Karma',
           },
           {
                headerName: 'Beamed In',
           },
           {
                headerName: 'Last Beamed In',
           },
           {
                headerName: 'Added to Contacts',
           }
        ],
        defaultColDef: {
            flex: 1,
            minWidth: 150,
            filter: true,
            sortable: true,
            floatingFilter: true,
            resizable: true,
        },
        rowData: null,
        loading: true,
        loggedIn: true,
    };

    onGridReady = async (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        const avatar = new oasisApi.Avatar()
        const karma = new oasisApi.Karma()

        const res = await avatar.getAll()
        if (!res.error) {
            let avatars = []
            const users = res.data.result
            for (let i = 0; i <= users.length - 1; i++) {
                let user = users[i]
                console.log('user')
                const karmaRes = await karma.getKarmaForAvatar(user.avatarId)
                console.log(karmaRes)
                let temp = {
                    avatar: user.username,
                    level: 1,
                    karma: karmaRes.data.result,
                    sex: user.title === 'Mr' ? 'Male' : 'Female',
                    created: 'Now',
                    last: 'Now ',
                    online: user.isBeamedIn
                }
                avatars.push(temp)
            }
            this.setState({ rowData: avatars })
        }
    }

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
                                <div className='contact-navbar'>
                                    <ul>
                                        <li>Friends</li>
                                        <li>Friends</li>
                                        <li>Colleagues</li>
                                        <li>MyList</li>
                                    </ul>
                                </div>
                                <div className="ag-theme-alpine custom-ag-parent">
                                    <AgGridReact
                                        columnDefs={this.state.columnDefs}
                                        defaultColDef={this.state.defaultColDef}
                                        onGridReady={this.onGridReady}
                                        rowData={this.state.rowData}
                                    />
                                </div>
                                <div className='contact-popup-button'>
                                    <button>Send Message</button>
                                    <button>Remove Friends</button>
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