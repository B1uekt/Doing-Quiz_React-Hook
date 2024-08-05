import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { postCreateNewUser, putUpdateUser } from '../../../services/UserServices'
import _ from 'lodash'
import { useTranslation } from 'react-i18next';

const ModalCreateUser = (props) => {
    const { t } = useTranslation();
    const { dataUpdate, setDataUpdate, currentPage, setCurrentPage, isViewUser, setViewUser } = props
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImg, setPreviewImg] = useState('')
    const { show, setShow } = props;

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email)
            setUsername(dataUpdate.username)
            setRole(dataUpdate.role)
            setImage(dataUpdate.image)
            if (dataUpdate.image) {
                setPreviewImg(`data:image/jpeg;base64,${dataUpdate.image}`)
            }

        }
    }, [dataUpdate])

    const handleClose = () => {
        setEmail('')
        setPassword('')
        setUsername('')
        setRole('USER')
        setImage('')
        setPreviewImg('')
        setShow(false)
        setViewUser(false)
        setDataUpdate({})
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

        let data = await postCreateNewUser(email, password, username, role, image)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            setCurrentPage(1);
            await props.fetchListUserWithPaginate(1);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    const handleSubmitUpdateUser = async () => {
        console.log(image)
        let data = await putUpdateUser(dataUpdate.id, username, role, image)
        //console.log(">>>>>check res: ", data)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            //console.log('page: ', currentPage)
            await props.fetchListUserWithPaginate(currentPage);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>

            <Modal backdrop="static" show={show} onHide={handleClose} size="xl" className='modal-add-user'>
                <Modal.Header closeButton>
                    {_.isEmpty(dataUpdate) ?
                        <Modal.Title>{t('Admin.Manage-Users.Modal.title-add')}</Modal.Title>
                        :
                        <Modal.Title>{t('Admin.Manage-Users.Modal.title-update')}</Modal.Title>
                    }

                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                disabled={!_.isEmpty(dataUpdate)}
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('Admin.Manage-Users.Modal.passw')}</label>
                            <input
                                disabled={!_.isEmpty(dataUpdate)}
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('Admin.Manage-Users.Username')}</label>
                            <input
                                type="text"
                                disabled={isViewUser}
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">{t('Admin.Manage-Users.Role')}</label>
                            <select disabled={isViewUser} id="inputState" className="form-select" onChange={(event) => setRole(event.target.value)} value={role}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label">
                                {t('Admin.Manage-Users.Modal.image')}
                                <input
                                    className="form-control"
                                    type="file" id="formFile"
                                    onChange={(event) => handleUploadImg(event)}>

                                </input>
                            </label>
                        </div>

                        <div className='col-md-12 img-preview'>
                            {previewImg ?

                                <img alt="" src={previewImg} />
                                :
                                <span>{t('Admin.Manage-Users.Modal.Prev-img')}</span>
                            }


                        </div>
                    </form></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('Admin.Manage-Users.Modal.Close')}
                    </Button>
                    {isViewUser
                        ?
                        ''
                        :
                        <Button variant="primary" onClick={_.isEmpty(dataUpdate) ? () => handleSubmitCreateUser() : () => handleSubmitUpdateUser()} >
                            {t('Admin.Manage-Users.Modal.Save')}
                        </Button>
                    }

                </Modal.Footer>
            </Modal>

        </>

    );
}
export default ModalCreateUser