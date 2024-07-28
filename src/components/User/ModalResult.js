
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ModalResult = (props) => {
    const { show, setShow, dataModalResult } = props;

    const handleClose = () => setShow(false);
    // console.log(">>>check data", dataModalResult)
    return (
        <>

            <Modal
                backdrop="static"
                show={show}
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your result </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total Question: <b>{dataModalResult.countTotal}</b></div>
                    <div>Total Correct Answer: <b>{dataModalResult.countCorrect}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Show answer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;