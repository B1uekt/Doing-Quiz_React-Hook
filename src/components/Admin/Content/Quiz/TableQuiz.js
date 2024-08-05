import { useState } from "react"
import { IoMdTrash } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import { useTranslation } from 'react-i18next';
const TableQuiz = (props) => {
    const { t } = useTranslation();
    const { listQuiz } = props
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false)
    const [dataQuizDelete, setDataQuizDelete] = useState({})
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false)
    const [dataQuizUpdate, setDataQuizUpdate] = useState({})


    const handleDeleteQuizBtn = (item) => {
        setShowModalDeleteQuiz(true)
        setDataQuizDelete(item)
    }

    const handleUpdateQuizBtn = (item) => {
        setShowModalUpdateQuiz(true)
        setDataQuizUpdate(item)
    }
    return (
        <>
            <div>
                List Quiz
            </div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">{t('Admin.Manage-Quizzes.Name')}</th>
                        <th scope="col">{t('Admin.Manage-Quizzes.Description')}</th>
                        <th scope="col">{t('Admin.Manage-Quizzes.Type')}</th>
                        <th scope="col">{t('Admin.Manage-Users.Action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 &&
                        listQuiz.map((item, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td className="action-icon d-flex">
                                        <span onClick={() => handleUpdateQuizBtn(item)}>{<FaPencilAlt />}</span>
                                        <span onClick={() => handleDeleteQuizBtn(item)}>{<IoMdTrash />}</span>
                                    </td>
                                </tr>
                            )
                        }
                        )
                    }
                    {listQuiz && listQuiz.length === 0
                        && <tr>
                            <td colSpan={4}>Not Found Data</td>
                        </tr>}
                </tbody>
            </table>
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataQuizDelete}
                fetchListQuiz={props.fetchListQuiz}
            />
            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataQuizUpdate}
                fetchListQuiz={props.fetchListQuiz}
            />
        </>
    )
}
export default TableQuiz