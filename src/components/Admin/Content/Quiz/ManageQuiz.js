import './ManageQuiz.scss'
import Select from 'react-select';
import React, { useState } from 'react';
const ManageQuiz = () => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];

    const [name, setName] = useState('')
    const [desciption, setDesciption] = useState('')
    const [type, setType] = useState('EASY')
    const [image, setImg] = useState(null)

    const handleChangeFile = () => {

    }
    return (

        <div className="quiz-container">
            <div className="title">
                Manage Quizzes
            </div>
            <hr></hr>
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
                            placeholder="desciption"
                            value={desciption}
                            onChange={(event) => setDesciption(event.target.value)} />
                        <label>Description</label>
                    </div>
                    <div className='my-3'>
                        <Select
                            // defaultValue={type}
                            // onChange={() => setType()}
                            options={options}
                            placeholder={type}
                        />
                    </div>
                    <div className='more-actions'>
                        <label className="form-label mb-2">
                            Upload Image</label>
                        <input
                            className="form-control"
                            type="file"
                            onChange={() => handleChangeFile()}
                        />
                    </div>
                </fieldset>
            </div>
            <div className="list-detail">
                table
            </div>
        </div>
    )
}
export default ManageQuiz