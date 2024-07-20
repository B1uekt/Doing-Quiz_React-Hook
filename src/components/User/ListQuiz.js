import { useEffect, useState } from "react"
import { getQuizByUser } from "../../services/QuizServices"
import { useNavigate } from "react-router-dom"
import './ListQuiz.scss'
const ListQuiz = () => {
    const navigate = useNavigate()
    const [arrQuiz, setArrQuiz] = useState([])
    useEffect(() => {
        getQuizData();
    }, [])

    const getQuizData = async () => {
        let data = await getQuizByUser()
        if (data && data.EC === 0) {
            // console.log(data.DT)
            setArrQuiz(data.DT)
        }
    }
    return (
        <>
            <div className="list-quiz-container d-flex container">
                {arrQuiz && arrQuiz.length > 0 &&
                    arrQuiz.map((quiz, index) => {
                        return (
                            <div key={`${index}-quiz`} className="card" style={{ width: "18rem" }}>
                                <img className="card-img-top" src={`data:image/jpeg;base64,${quiz.image}`} alt="Quiz" />
                                <div className="card-body">
                                    <h5 className="card-title">Quiz {index + 1}</h5>
                                    <p className="card-text">{quiz.description}</p>
                                    <button onClick={() => navigate(`/quiz/${quiz.id}`, {
                                        state: {
                                            quizTilte: quiz.description
                                        }
                                    })} className="btn btn-primary">Start Now</button>
                                </div>
                            </div>
                        )
                    })
                }
                {arrQuiz && arrQuiz.length === 0 &&
                    <div>You don't have any quiz now</div>
                }
            </div>

        </>
    )
}
export default ListQuiz