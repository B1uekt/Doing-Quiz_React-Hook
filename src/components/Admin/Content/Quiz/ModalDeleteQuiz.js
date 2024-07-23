
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../services/QuizServices';

const ModalDeleteQuiz = (props) => {
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
                    <Modal.Title>Confirm Delete the Quiz ? </Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this quiz ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;