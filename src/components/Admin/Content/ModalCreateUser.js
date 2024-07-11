import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/UserServices'

const ModalCreateUser = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImg, setPreviewImg] = useState('')
    const { show, setShow } = props;

    const handleClose = () => {
        setEmail('')
        setPassword('')
        setUsername('')
        setRole('USER')
        setImage('')
        setPreviewImg('')
        setShow(false)
    };
    const handleUploadImg = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImg(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
        else {
            setPreviewImg("")
        }

    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitCreateUser = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid Email")
            return;
        }
        if (!password) {
            toast.error("Missing Password")
            return;
        }




        let res = await postCreateNewUser(email, password, username, role, image)
        console.log(">>>>>check res: ", res.data)
        if (res.data && res.data.EC === 0) {
            toast.success(res.data.EM);
            handleClose();
        }
        if (res.data && res.data.EC !== 0) {
            toast.error(res.data.EM);
        }
    }
    return (
        <>

            <Modal backdrop="static" show={show} onHide={handleClose} size="xl" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select id="inputState" className="form-select" onChange={(event) => setRole(event.target.value)} value={role}>
                                <option selected value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label">
                                Image
                                <input class="form-control" type="file" id="formFile" onChange={(event) => handleUploadImg(event)}></input>
                            </label>
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImg ?

                                <img src={previewImg} />
                                :
                                <span>Preview Image</span>
                            }


                        </div>
                    </form></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </>

    );
}
export default ModalCreateUser