import './ManageQuiz.scss'
import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { postCreateNewQuiz } from '../../../../services/QuizServices';
import { toast } from 'react-toastify';
import { BiSolidFolderPlus } from "react-icons/bi"
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import { getAllQuiz } from "../../../../services/QuizServices";
import AssignQuiz from './AssignQuiz';
// import ManageQuestions from '../Questions/ManageQuestions';
import { useTranslation } from 'react-i18next';
import QuizQA from './QuizQA';

const ManageQuiz = () => {
    const { t } = useTranslation();
    const [listQuiz, setListQuiz] = useState([]);
    // const [isUpdateQA, setIsUpdateQA] = useState(false);
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
    const options = [
        { value: 'EASY', label: `${t('Admin.Manage-Quizzes.Easy')}` },
        { value: 'MEDIUM', label: `${t('Admin.Manage-Quizzes.Medium')}` },
        { value: 'HARD', label: `${t('Admin.Manage-Quizzes.Hard')}` },
    ];

    const [name, setName] = useState('')
    const [description, setDesciption] = useState('')
    const [type, setType] = useState({ value: 'EASY', label: `${t('Admin.Manage-Quizzes.Easy')}` })
    const [image, setImage] = useState('')

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
            // console.log(event.target.files[0].name)
        }
    }

    const handleSubmitQuiz = async () => {
        let res = await postCreateNewQuiz(description, name, type?.value, image)

        if (!name || !description) {
            toast.error('Name/Description is required')
        }
        if (res && res.EC === 0) {
            fetchListQuiz()
            setName('')
            setDesciption('')
            setType({ value: 'EASY', label: `${t('Admin.Manage-Quizzes.Easy')}` })
            setImage(null)
            toast.success(res.EM);
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }
    return (

        <div className="quiz-container">
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <div className="title">
                            {t('Admin.SideBar.manage-quizzes')}
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">

                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">{t('Admin.Manage-Quizzes.Add')}</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="your quiz name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label>{t('Admin.Manage-Quizzes.Name')}</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="description"
                                        value={description}
                                        onChange={(event) => setDesciption(event.target.value)} />
                                    <label>{t('Admin.Manage-Quizzes.Description')}</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        defaultValue={type.value}
                                        onChange={setType}
                                        options={options}
                                        placeholder=""
                                    />
                                </div>
                                <div className='more-actions d-flex mt-4 col-6'>
                                    {/* <label className="form-label mb-2">
                                        Upload Image</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        onChange={(event) => handleChangeFile(event)}
                                    /> */}

                                    <label className='label-upload d-flex' htmlFor='labelUpload'>
                                        <BiSolidFolderPlus /> {t('Admin.Manage-Quizzes.Upload')}

                                    </label>
                                    <span className=''>{image ? image.name : `${t('Admin.Manage-Quizzes.NoFile')}`}</span>

                                    <input type="file" id="labelUpload" hidden onChange={(event) => handleChangeFile(event)} />

                                </div>
                                <div className='mt-3'>
                                    <button onClick={() => handleSubmitQuiz()} className='btn btn-warning'>{t('Admin.Manage-Users.Modal.Save')}</button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail">
                            <TableQuiz
                                listQuiz={listQuiz}
                                fetchListQuiz={fetchListQuiz} />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>{t('Admin.Manage-Quizzes.title-1')}</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>{t('Admin.Manage-Quizzes.title-2')}</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

        </div>
    )
}
export default ManageQuiz