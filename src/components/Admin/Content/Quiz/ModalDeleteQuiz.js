
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../services/QuizServices';
import { useTranslation } from 'react-i18next';
const ModalDeleteQuiz = (props) => {
    const { t } = useTranslation();
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDelete = async () => {
        let res = await deleteQuiz(dataDelete.id)
        if (res && res.EC === 0) {
            props.fetchListQuiz()
            handleClose()
            toast.success(res.EM)
        }
    }
    return (
        <>

            <Modal
                backdrop="static"
                show={show}
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('Admin.Manage-Quizzes.Modal.delete-title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('Admin.Manage-Quizzes.Modal.qs-delete')}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('Admin.Manage-Users.Modal.Cancel')}
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDelete()}>
                        {t('Admin.Manage-Users.Modal.Confirm')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;