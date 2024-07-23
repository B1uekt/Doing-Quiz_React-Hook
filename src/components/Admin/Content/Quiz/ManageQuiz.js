import './ManageQuiz.scss'
import Select from 'react-select';
import React, { useState } from 'react';
import { postCreateNewQuiz } from '../../../../services/QuizServices';
import { toast } from 'react-toastify';
import { FaPlus } from "react-icons/fa";
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';

const ManageQuiz = () => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];

    const [name, setName] = useState('')
    const [description, setDesciption] = useState('')
    const [type, setType] = useState({ value: 'EASY', label: 'EASY' })
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
            setName('')
            setDesciption('')
            setType({ value: 'EASY', label: 'EASY' })
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
                            Manage Quizzes
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">

                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add new Quiz</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="your quiz name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="description"
                                        value={description}
                                        onChange={(event) => setDesciption(event.target.value)} />
                                    <label>Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        defaultValue={type.value}
                                        onChange={setType}
                                        options={options}
                                        placeholder={type.value}
                                    />
                                </div>
                                <div className='more-actions d-flex'>
                                    {/* <label className="form-label mb-2">
                                        Upload Image</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        onChange={(event) => handleChangeFile(event)}
                                    /> */}

                                    <label className='form-label mb-2 label-upload d-flex' htmlFor='labelUpload'>
                                        <FaPlus /> Upload File Image

                                    </label>
                                    {image && <span className='mb-2 ml-2'> {image.name} </span>}

                                    <input type="file" id="labelUpload" hidden onChange={(event) => handleChangeFile(event)} />
                                </div>
                                <div className='mt-3'>
                                    <button onClick={() => handleSubmitQuiz()} className='btn btn-warning'>Save</button>
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className="list-detail">
                <TableQuiz />
            </div>
        </div>
    )
}
export default ManageQuiz