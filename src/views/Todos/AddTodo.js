import React, { useState } from "react";
import { toast } from 'react-toastify';

const AddTodo = (props) => {
    const [title, setTitle] = useState('')

    let { isDisabledInput } = props

    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleSubmit = () => {
        if (!title) {
            toast.error("Missing Todo's Title")
            return;
        }
        props.addNewTodo({
            id: Math.floor(Math.random() * 1001),
            title: title
        })
        setTitle('')
    }
    return (
        <div className="add-todo">
            <input type="text" value={title} disabled={isDisabledInput} onChange={(event) => handleChangeTitle(event)} />
            <button className="add" onClick={() => handleSubmit()} >Add</button>
        </div>
    )
}
export default AddTodo;