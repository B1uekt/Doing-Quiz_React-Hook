
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { getHistory } from '../../services/UserServices';
import { useState } from 'react';
import moment from 'moment/moment';
import Button from 'react-bootstrap/Button';
const History = (props) => {
    const { handleClose } = props
    const [dataHistory, setDataHistory] = useState([])
    useEffect(() => {
        const fetchHistory = async () => {
            let res = await getHistory()
            if (res && res.EC === 0) {
                console.log(res)
                let newData = res?.DT?.data?.map(item => {
                    return {
                        total_correct: item?.total_correct,
                        total_question: item?.total_question,
                        name: item?.quizHistory?.name ?? "",
                        id: item.id,
                        date: moment(item.createdAt).utc().format('DD/MM/YYYY hh:mm:ss A')
                    }
                })
                if (newData.length > 7) {
                    newData = newData.slice(newData.length - 7, newData.length)
                }
                setDataHistory(newData)
            }
        }
        fetchHistory()
    }, [])
    return (
        <>
            <div className='table'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Quiz Name</th>
                            <th>Total Question</th>
                            <th>Total Correct</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataHistory && dataHistory.length > 0 &&
                            dataHistory.map((item, index) => {
                                return (
                                    <tr key={`history_id${index}`} >
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.total_question}</td>
                                        <td>{item.total_correct}</td>
                                        <td>{item.date}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>
            </div>
            <div className='btn-action d-flex justify-content-end'>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </div>
        </>
    )
}
export default History