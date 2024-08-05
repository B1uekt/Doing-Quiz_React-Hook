
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/UserServices';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
const ModalDeleteUser = (props) => {
    const { t } = useTranslation();
    const { show, setShow, dataDelete, currentPage } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteUser = async () => {
        let data = await deleteUser(dataDelete.id)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListUserWithPaginate(currentPage);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
        handleClose()
    }
    return (
        <>

            <Modal
                backdrop="static"
                show={show}
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('Admin.Manage-Users.Modal.title-delete')} </Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('Admin.Manage-Users.Modal.ques-delete')} <b>Email = {dataDelete && dataDelete.email ? dataDelete.email : " "}</b> </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('Admin.Manage-Users.Modal.Close')}
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
                        {t('Admin.Manage-Users.Modal.Confirm')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;