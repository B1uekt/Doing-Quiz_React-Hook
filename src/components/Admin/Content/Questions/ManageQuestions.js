import { useState } from 'react';
import Select from 'react-select';
import './ManageQuestions.scss'
import { BiSolidFolderPlus } from "react-icons/bi"
import { BsPatchPlusFill } from "react-icons/bs";
import { BsFillPatchMinusFill } from "react-icons/bs";
import { TbHexagonMinusFilled } from "react-icons/tb";
import { TbHexagonPlusFilled } from "react-icons/tb";
const ManageQuestions = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [questionImage, setQuestionImage] = useState('')
    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setQuestionImage(event.target.files[0])
            // console.log(event.target.files[0].name)
        }
    }
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
                        options={options}
                    />
                </div>
                <div className='mt-3 mb-2'>
                    Add New Question
                </div>
                <div>
                    <div className='question-content d-flex mb-3'>
                        <div className="form-floating col-6">
                            <input type="text" className="form-control" placeholder="name@example.com" />
                            <label>Description</label>
                        </div>
                        <div className='more-actions d-flex'>
                            <label className='label-upload d-flex' htmlFor='labelUpload'>
                                <BiSolidFolderPlus /> Upload File Image
                            </label>
                            <span className=''>{questionImage ? '1 file is uploaded' : '0 file is uploaded'}</span>

                            <input type="file" id="labelUpload" hidden onChange={(event) => handleChangeFile(event)} />

                        </div>
                        <div className='btn-add-new-question'>
                            <span className='icon-add'>
                                <BsPatchPlusFill />
                            </span>
                            <span className='icon-remove'>
                                <BsFillPatchMinusFill />
                            </span>
                        </div>

                    </div>
                    <div className='answer-content d-flex col-6'>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                        />
                        <div className="form-floating answer">
                            <input type="text" className="form-control" placeholder="name@example.com" />
                            <label>Answer 1</label>
                        </div>
                        <div className='btn-add-new-question'>
                            <span className='icon-add'>
                                <TbHexagonPlusFilled />
                            </span>
                            <span className='icon-remove'>
                                <TbHexagonMinusFilled />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}
export default ManageQuestions