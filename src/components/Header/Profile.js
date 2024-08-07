import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import ChangePassword from './ChangePassword';
import History from './History';
import './Profile.scss'
import UserInfor from './UserInfor';

const Profile = (props) => {
    const { show, setShow } = props

    const handleClose = () => {
        setShow(false)
    }


    return (
        <Modal backdrop="static" show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body><Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="home" title="Home">
                    <UserInfor
                        handleClose={handleClose}
                    />

                </Tab>
                <Tab eventKey="Password" title="Password">
                    <ChangePassword
                        handleClose={handleClose}
                    />
                </Tab>
                <Tab eventKey="contact" title="Contact" >
                    <History
                        handleClose={handleClose} />
                </Tab>
            </Tabs></Modal.Body>
        </Modal>
    )
}
export default Profile