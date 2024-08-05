import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz, postAnswers } from '../../services/QuizServices';
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from './Question';
import ModalResult from './ModalResult';
import RightContent from './Content/RightContent';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const DetailQuiz = (props) => {
    const navigate = useNavigate()
    const { t } = useTranslation();
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();

    const [dataQuiz, setDataQuiz] = useState([])
    const [index, setIndex] = useState(0)

    const [isShowModalResult, setIsShowModalResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})
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
                            item.answers.isSelected = false
                            answers.push(item.answers)
                            // console.log('item answers: ', item.answers)
                        })
                        answers = _.orderBy(answers, ['id'], ['asc']);
                        // console.log('value: ', value, 'key: ', key)
                        return { questionId: key, answers, questionDesciption, image }
                    })
                    .value();
                setDataQuiz(data)
                // console.log(data)
            }
        }
        fetchQuestion();
    }, [quizId])

    // console.log('>>>check dataQuiz: ', dataQuiz)

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }

    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {

            let b = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answers = b;
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }

    const handleFinish = async () => {
        // console.log('>>>>>Check data before submit', dataQuiz)
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = []
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(item => {
                let questionId = item.questionId;
                let userAnswerId = [];
                item.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId,
                })
            })
        }

        payload.answers = answers;
        // console.log('>>>>Final payload: ', payload)
        let res = await postAnswers(payload)
        // console.log('>>>check res:', res)
        if (res && res.EC === 0) {
            setDataModalResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData
            })
            setIsShowModalResult(true)
        }
        else {
            alert('Something wrong')
        }
    }


    return (
        <>
            <div className='link-breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => navigate('/')}>{t('ListQuiz.Home')}</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => navigate('/users')}>
                        {t('ListQuiz.List-quiz')}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Quiz {quizId}</Breadcrumb.Item>
                </Breadcrumb>
            </div>

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
                            handleCheckBox={handleCheckBox}
                            data={dataQuiz && dataQuiz.length > 0 ?
                                dataQuiz[index] : []} />
                    </div>
                    <div className="footer d-flex justify-content-center">

                        <button className='btn btn-secondary' onClick={() => handlePrev()}>Prev</button>
                        <button className='btn btn-primary ' onClick={() => handleNext()}>Next</button>
                        {+index === dataQuiz.length - 1 &&
                            <button className='btn btn-warning ' onClick={() => handleFinish()}>Finish</button>
                        }
                    </div>
                </div>
                <div className="right-content">
                    <RightContent
                        dataQuiz={dataQuiz}
                        index={index}
                        setIndex={setIndex}
                        handleFinish={handleFinish} />
                </div>
                <ModalResult show={isShowModalResult}
                    setShow={setIsShowModalResult}
                    dataModalResult={dataModalResult}
                />
            </div>
        </>
    )

}
export default DetailQuiz