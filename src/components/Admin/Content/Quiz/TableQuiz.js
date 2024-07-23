import { useEffect, useState } from "react"
import { getAllQuiz } from "../../../../services/QuizServices";
import { IoMdTrash } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
const TableQuiz = () => {

    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchListQuiz()
    }, [])

    const fetchListQuiz = async () => {
        let res = await getAllQuiz()
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
            // console.log(res.DT)
        }

    }
    return (
        <>
            <div>
                List Quiz
            </div>
            <table className="table table-hover table-bordered ">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length &&
                        listQuiz.map((item, index) => {
                            return (
                                <tr>
                                    <th key={`table-quiz-${index}`} scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td className="action-icon d-flex">
                                        <span >{<FaPencilAlt />}</span>
                                        <span><IoMdTrash /></span>

                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table></>
    )
}
export default TableQuiz