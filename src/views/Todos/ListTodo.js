import React, { useEffect, useState } from "react";
import './ListTodo.scss'
import AddTodo from './AddTodo'
import { toast } from 'react-toastify';


const ListToDo = () => {
    const [listToDo, setlistToDo] = useState(
        [
            { id: 'todo1', title: 'Doing homework' },
            { id: 'todo2', title: 'Making video' },
            { id: 'todo3', title: 'Watching TV' }
        ])
    const [editTodo, setEditTodo] = useState('')
    const [isDisabledInput, setHideShowInput] = useState(false)
    const isEmptyObj = Object.keys(editTodo).length === 0
    const addNewTodo = (todo) => {
        setlistToDo([...listToDo, todo])
        toast.success("Successful!")
    }

    const handleDeleteTodo = (todo) => {
        let currentJob = listToDo
        currentJob = currentJob.filter(item => item.id !== todo.id)
        setlistToDo(currentJob)
        toast.success("Delete succeed!")
    }

    const handleOnChangeEdit = (event) => {
        let editTodoCopy = { ...editTodo }
        editTodoCopy.title = event.target.value
        setEditTodo(editTodoCopy)
    }

    const handleEditTodo = (todo) => {

        if (!isEmptyObj && editTodo.id === todo.id) {

            let listToDoCopy = [...listToDo]

            let objIndex = listToDoCopy.findIndex(obj => obj.id == todo.id);

            listToDoCopy[objIndex].title = editTodo.title
            // console.log(listToDoCopy)
            setlistToDo(listToDoCopy)
            setEditTodo('')
            setHideShowInput(false)
            toast.success("Update succeed!")
            return
        }

        else {
            setEditTodo(todo)
        }
        setHideShowInput(true)
    }

    const handleCancelTodo = () => {
        setEditTodo('')
        setHideShowInput(false)
    }
    useEffect(() => {
        if (listToDo.length == 0) {
            alert('Delete all')
        }
    }, [listToDo]
    )


    return (

        <>
            <p>
                Simple TODO Apps with ReactJS
            </p>

            <div className="list-todo-container">

                <AddTodo
                    addNewTodo={addNewTodo}
                    isDisabledInput={isDisabledInput}
                />
                <div className="list-todo-content">

                    {listToDo && listToDo.length > 0 &&
                        listToDo.map((item, index) => {
                            return (
                                <div className="todo-child" key={item.id}>
                                    {isEmptyObj ?
                                        <span> {index + 1}. {item.title} </span>
                                        :
                                        <>
                                            {editTodo.id === item.id ?
                                                <span> {index + 1}. <input onChange={(event) => handleOnChangeEdit(event)} value={editTodo.title}></input></span>
                                                :
                                                <span> {index + 1}. {item.title} </span>
                                            }
                                        </>


                                    }
                                    <button className="edit" onClick={() => handleEditTodo(item)}>
                                        {!isEmptyObj && editTodo.id === item.id ? 'Save' : 'Edit'}
                                    </button>
                                    {!isEmptyObj && editTodo.id === item.id ?
                                        <button className="cancel" onClick={() => handleCancelTodo(item)}>Cancel</button>
                                        :
                                        ''
                                    }
                                    <button className="delete" onClick={() => handleDeleteTodo(item)}>Delete</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )

}
export default ListToDo;