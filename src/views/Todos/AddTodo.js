import React from "react";
import { toast } from 'react-toastify';
class AddTodo extends React.Component {
    state = {
        title: '',
    }

    handleChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    handleSubmit = () => {
        if (!this.state.title) {
            toast.error("Missing Todo's Title")
            return;
        }
        this.props.addNewTodo({
            id: Math.floor(Math.random() * 1001),
            title: this.state.title
        })
        this.setState({
            title: '',
        })
    }
    render() {
        let { title } = this.state
        let { isDisabledInput } = this.props
        console.log('>>>check disabled: ', isDisabledInput)
        return (
            <div className="add-todo">
                <input type="text" value={title} disabled={isDisabledInput} onChange={(event) => this.handleChangeTitle(event)} />
                <button className="add" onClick={() => this.handleSubmit()} >Add</button>
            </div>
        )
    }

}
export default AddTodo;