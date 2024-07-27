import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllQuiz, postAssignQuiz } from "../../../../services/QuizServices";
import { getAllUser } from "../../../../services/UserServices";
import { toast } from 'react-toastify';

const AssignQuiz = (props) => {
    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [listUser, setListUser] = useState([])
    const [selectedUser, setSelectedUser] = useState({})

    useEffect(() => {
        fetchListQuiz()
        fetchListUser()
    }, [])

    const fetchListQuiz = async () => {
        let res = await getAllQuiz()
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(newQuiz)
            // console.log(res.DT)
        }

    }

    const fetchListUser = async () => {
        let res = await getAllUser()
        if (res && res.EC === 0) {
            let newUser = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(newUser)
            // console.log(res.DT)
        }

    }

    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setSelectedQuiz({})
            setSelectedUser({})
        }
        if (res && res.EC === -1) {
            toast.error(res.EM)
        }
    }
    return (
        <div className="assign-quiz-container row">
            <div className='col-6 form-group'>
                <label className='mb-2'>Select Quiz:</label>
                <Select
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className='col-6 form-group'>
                <label className='mb-2'>Select User:</label>
                <Select
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button onClick={() => handleAssign()} className='btn btn-warning mt-3'>Assign</button>
            </div>
        </div>
    )
}
export default AssignQuiz