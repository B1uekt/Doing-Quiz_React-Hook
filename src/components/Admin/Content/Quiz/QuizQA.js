import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss'
import { BiSolidFolderPlus } from "react-icons/bi"
import { BsPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { TbHexagonMinusFilled, TbHexagonPlusFilled } from "react-icons/tb";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getAllQuiz, getQuizwithQA, postUpsertQA } from "../../../../services/QuizServices";
import { toast } from 'react-toastify';


const QuizQA = () => {
    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                }
            ]
        }]
    const [questions, setQuestions] = useState(initQuestion)

    const [isPreviewImage, setIsPreviewImage] = useState(false);

    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ','
    })

    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({})


    function urltoFile(url, filename, mimeType) {
        if (url.startsWith('data:')) {
            var arr = url.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, { type: mime || mimeType });
            return Promise.resolve(file);
        }
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
    }


    useEffect(() => {
        fetchListQuiz()
    }, [])

    useEffect(() => {


        if (selectedQuiz && Object.keys(selectedQuiz).length > 0) {
            fetchQuizQA()
        }
    }, [selectedQuiz])


    const fetchQuizQA = async () => {
        let res = await getQuizwithQA(selectedQuiz.value)
        if (res && res.EC === 0) {
            //convert Base64 to File object
            let newQA = []
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i];
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`
                    res.DT.qa[i].imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `question-${q.id}.png`, 'image/png')
                }
                newQA.push(q);
            }

            setQuestions(newQA);
            // console.log(newQA)
            // console.log('>>>check res', res)
        }

    }

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

    const handleChangeFile = (questionId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionClone[index].imageFile = event.target.files[0];
            questionClone[index].imageName = event.target.files[0].name;
            setQuestions(questionClone)
        }
    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion =
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    }
                ]
            }
            setQuestions([...questions, newQuestion])
        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id)
            setQuestions(questionsClone)
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            if (type === 'ADD') {
                const newAnswer =
                {

                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                }
                // console.log("index: ", index)
                questionClone[index].answers.push(newAnswer)
                setQuestions(questionClone)

            }
            if (type === 'REMOVE') {
                // console.log("questionClone[index]: ", questionClone[index])
                questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId)
                setQuestions(questionClone)
            }
        }
    }
    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionClone = _.cloneDeep(questions);
            let index = questionClone.findIndex(item => item.id === questionId)
            if (index > -1) {
                questionClone[index].description = value;
                setQuestions(questionClone)
            }
        }
    }
    const handleAnswer = (type, answerId, questionId, event) => {
        let questionClone = _.cloneDeep(questions);
        let indexQuestion = questionClone.findIndex(item => item.id === questionId)
        if (indexQuestion > -1) {

            questionClone[indexQuestion].answers = questionClone[indexQuestion].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = event.target.checked
                    }
                    if (type === 'INPUT') {
                        answer.description = event.target.value
                    }
                }
                return answer
            })
            setQuestions(questionClone)
        }
    }
    const handleSubmitQuestion = async () => {
        // console.log('questions: ', questions, selectedQuiz)
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a Quiz !")
            return;
        }

        let flag = 1;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description || questions[i].description.trim().length === 0) {
                toast.error(`Not Empty at Question ${i + 1}`);
                flag = 0;
                break;
            }
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description || questions[i].answers[j].description.trim().length === 0) {
                    flag = 0
                    toast.error(`Not Empty Answer ${j + 1} at Question ${i + 1}`);
                    break;
                }
            }
            if (flag === 0) break
        }
        if (flag === 0) return;
        let questionClone = _.cloneDeep(questions);
        for (let i = 0; i < questionClone.length; i++) {
            if (questionClone[i].imageFile) {
                questionClone[i].imageFile = await toBase64(questionClone[i].imageFile)
            }
        }
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionClone
        });
        console.log(">>>>check questionClone", questionClone)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            fetchQuizQA()
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const handlePreviewImage = (questionId) => {
        let questionClone = _.cloneDeep(questions);
        let indexQuestion = questionClone.findIndex(item => item.id === questionId)
        if (indexQuestion > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionClone[indexQuestion].imageFile),
                title: questionClone[indexQuestion].imageName
            })
            setIsPreviewImage(true)
        }
    }
    console.log('check question: ', questions)
    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <div className="add-new-questions">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz:</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add New Question
                </div>
                {
                    questions && questions.length > 0 &&
                    questions.map((item, index) => {
                        return (
                            <div key={`question-id${index}`} className='q-main mb-4'>
                                <div className='question-content d-flex mb-3'>
                                    <div className="form-floating col-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={item.description}
                                            onChange={(event) => handleOnChange('QUESTION', item.id, event.target.value)} />
                                        <label>Question {index + 1}'s description</label>
                                    </div>
                                    <div className='more-actions d-flex'>
                                        <label htmlFor={`${item.id}`} className='label-upload d-flex' >
                                            <BiSolidFolderPlus />
                                        </label>
                                        <span >{item.imageFile ? <span onClick={() => handlePreviewImage(item.id)}> {item.imageName} </span> : '0 file is uploaded'}</span>

                                        <input type="file" id={`${item.id}`} hidden onChange={(event) => handleChangeFile(item.id, event)} />

                                    </div>
                                    <div className='btn-add-new-question'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')} className='icon-add'>
                                            <BsPatchPlusFill />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', item.id)} className='icon-remove'>
                                                <BsFillPatchMinusFill />
                                            </span>
                                        }

                                    </div>

                                </div>
                                {item.answers && item.answers.length > 0 &&
                                    item.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className='answer-content mb-3 d-flex col-6'>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="flexCheckDefault"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswer('CHECKBOX', answer.id, item.id, event)}
                                                />
                                                <div className="form-floating answer">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        value={answer.description}
                                                        onChange={(event) => handleAnswer('INPUT', answer.id, item.id, event)}
                                                    />
                                                    <label>Answer {index + 1}</label>
                                                </div>
                                                <div className='btn-add-new-question'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', item.id, '')} className='icon-add'>
                                                        <TbHexagonPlusFilled />
                                                    </span>
                                                    {
                                                        item.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', item.id, answer.id)} className='icon-remove'>
                                                            <TbHexagonMinusFilled />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button className='btn btn-warning' onClick={() => handleSubmitQuestion()}>Save Questions</button>
                    </div>
                }
                {
                    isPreviewImage === true && <Lightbox image={dataImagePreview.url} title={dataImagePreview.title} onClose={() => setIsPreviewImage(false)}></Lightbox>
                }
            </div>


        </div>
    )


}
export default QuizQA