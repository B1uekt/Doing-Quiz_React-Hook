import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash'
import { putUpdateQuiz } from '../../../../services/QuizServices';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ModalUpdateQuiz = (props) => {
    const { t } = useTranslation();
    const { dataUpdate, show, setShow } = props
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [previewImg, setPreviewImg] = useState('')
    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name)
            setDifficulty(dataUpdate.difficulty)
            setDescription(dataUpdate.description)
            setImage(dataUpdate.description)
            if (dataUpdate.image) {
                setPreviewImg(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])

    const handleClose = () => {
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

    const handleSubmitUpdateUser = async () => {
        let res = await putUpdateQuiz(dataUpdate.id, description, name, difficulty, image)
        if (res && res.EC === 0) {
            props.fetchListQuiz()
            handleClose()
            toast.success(res.EM)
        }
    }
    return (
        <>

            <Modal backdrop="static" show={show} onHide={handleClose} size="xl" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>{t('Admin.Manage-Quizzes.Modal.Title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">{t('Admin.Manage-Quizzes.Name')}</label>
                            <input
                                type="email"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('Admin.Manage-Quizzes.Type')}</label>
                            <select id="inputState" className="form-select" onChange={(event) => setDifficulty(event.target.value)} value={difficulty}>
                                <option value="EASY">{t('Admin.Manage-Quizzes.Easy')}</option>
                                <option value="MEDIUM">{t('Admin.Manage-Quizzes.Medium')}</option>
                                <option value="HARD">{t('Admin.Manage-Quizzes.Hard')}</option>
                            </select>

                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('Admin.Manage-Quizzes.Description')}</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)} />
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
                                <span>Preview Image</span>
                            }


                        </div>
                    </form></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateUser()} >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </>

    );
}
export default ModalUpdateQuiz