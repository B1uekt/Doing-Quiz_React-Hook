import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz } from '../../services/QuizServices';
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from './Question';


const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();

    const [dataQuiz, setDataQuiz] = useState([])
    const [index, setIndex] = useState(0)
    useEffect(() => {
        const fetchQuestion = async () => {
            let res = await getDataQuiz(quizId);
            if (res && res.EC === 0) {
                let raw = res.DT
                let data = _.chain(raw)
                    .groupBy("id")
                    .map((value, key) => {
                        let answers = []
                        let questionDesciption, image = null
                        value.forEach((item, index) => {
                            if (index === 0) {
                                questionDesciption = item.description
                                image = item.image
                            }
                            answers.push(item.answers)
                            // console.log('item answers: ', item.answers)
                        })
                        // console.log('value: ', value, 'key: ', key)
                        return { quesionId: key, answers: value, questionDesciption, image }
                    })
                    .value();
                setDataQuiz(data)
                // console.log(data)
            }
        }
        fetchQuestion();
    }, [quizId])

    console.log(dataQuiz)

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }
    return (

        <div className="detail-quiz-container d-flex">
            <div className='left-content'>
                <div className="title">
                    Quiz {quizId} : {location?.state.quizTilte}
                </div>
                <hr />
                <div className="q-body">

                </div>
                <div className="q-content">
                    <Question
                        index={index}
                        data={dataQuiz && dataQuiz.length > 0 ?
                            dataQuiz[index] : []} />
                </div>
                <div className="footer d-flex justify-content-center">

                    <button className='btn btn-secondary' onClick={() => handlePrev()}>Prev</button>
                    <button className='btn btn-primary ' onClick={() => handleNext()}>Next</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
        </div>
    )
}
export default DetailQuiz