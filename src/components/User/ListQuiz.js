import { useEffect, useState } from "react"
import { getQuizByUser } from "../../services/QuizServices"
import './ListQuiz.scss'
const ListQuiz = () => {
    const [arrQuiz, setArrQuiz] = useState([])
    useEffect(() => {
        getQuizData();
    }, [])

    const getQuizData = async () => {
        let data = await getQuizByUser()
        if (data && data.EC === 0) {
            setArrQuiz(data.DT)
        }
    }
    return (
        <>
            <div className="list-quiz-container d-flex container">
                {arrQuiz && arrQuiz.length &&
                    arrQuiz.map((quiz, index) => {
                        return (
                            <div key={`${index}-quiz`} className="card" style={{ width: "18rem" }}>
                                <img className="card-img-top" src={`data:image/jpeg;base64,${quiz.image}`} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Quiz {index + 1}</h5>
                                    <p className="card-text">{quiz.description}</p>
                                    <button className="btn btn-primary">Go somewhere</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </>
    )
}
export default ListQuiz