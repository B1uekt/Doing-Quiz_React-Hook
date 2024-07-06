import React from "react";
import './ListTodo.scss'
import AddTodo from './AddTodo'
import { toast } from 'react-toastify';

class ListTodo extends React.Component {
    state = {
        listToDo: [
            { id: 'todo1', title: 'Doing homework' },
            { id: 'todo2', title: 'Making video' },
            { id: 'todo3', title: 'Watching TV' },
        ],
        editTodo: '',
        isDisabledInput: false
    }
    addNewTodo = (todo) => {
        this.setState({
            listToDo: [...this.state.listToDo, todo]
        })
        toast.success("Successful!")
    }
    handleDeleteTodo = (todo) => {
        let currentJob = this.state.listToDo
        currentJob = currentJob.filter(item => item.id !== todo.id)
        this.setState({
            listToDo: currentJob,
        })
        toast.success("Delete succeed!")
    }
    handleOnChangeEdit = (event) => {
        let editTodoCopy = { ...this.state.editTodo }
        editTodoCopy.title = event.target.value
        this.setState({
            editTodo: editTodoCopy,
        })

    }
    handleEditTodo = (todo) => {
        let { listToDo, editTodo } = this.state

        let isEmptyObj = Object.keys(editTodo).length === 0


        if (!isEmptyObj && editTodo.id === todo.id) {

            let listToDoCopy = [...listToDo]

            let objIndex = listToDoCopy.findIndex(obj => obj.id == todo.id);

            listToDoCopy[objIndex].title = editTodo.title
            console.log(listToDoCopy)
            this.setState({
                listToDo: listToDoCopy,
                editTodo: '',
                isDisabledInput: false

            })
            return
        }

        else {
            this.setState({
                editTodo: todo
            })
        }
        this.setState({
            isDisabledInput: true
        })

    }
    handleCancelTodo = () => {
        this.setState({
            editTodo: '',
            isDisabledInput: false
        })
    }
    render() {
        let { listToDo, editTodo } = this.state
        let isEmptyObj = Object.keys(editTodo).length === 0
        return (
            <div className="list-todo-container">
                <AddTodo
                    addNewTodo={this.addNewTodo}
                    isDisabledInput={this.state.isDisabledInput}
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
                                                <span> {index + 1}. <input onChange={(event) => this.handleOnChangeEdit(event)} value={editTodo.title}></input></span>
                                                :
                                                <span> {index + 1}. {item.title} </span>
                                            }
                                        </>


                                    }
                                    <button className="edit" onClick={() => this.handleEditTodo(item)}>
                                        {!isEmptyObj && editTodo.id === item.id ? 'Save' : 'Edit'}
                                    </button>
                                    {!isEmptyObj && editTodo.id === item.id ?
                                        <button className="cancel" onClick={() => this.handleCancelTodo(item)}>Cancel</button>
                                        :
                                        ''
                                    }
                                    <button className="delete" onClick={() => this.handleDeleteTodo(item)}>Delete</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )

    }
}

export default ListTodo;