import React from 'react';
import ChildComponents from './ChildComponents';

class MyComponents extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        arrJobs: [
            { id: 'abcJob1', title: 'Developer', salary: '500$' },
            { id: 'abcJob2', title: 'Tester', salary: '400$' },
            { id: 'abcJob3', title: 'UX/UI', salary: '500$' },
        ]
    }

    handleChangeFirstName = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }

    handleChangeLastName = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        alert('click me')
    }
    render() {
        console.log(this.state)
        return (
            <>
                <form>
                    <label htmlFor="fname" />First name:<label /><br />
                    <input type="text" value={this.state.firstName} onChange={(event) => this.handleChangeFirstName(event)} /><br />
                    <label htmlFor="lname">Last name:</label><br />
                    <input type="text" value={this.state.lastName} onChange={(event) => this.handleChangeLastName(event)} /><br /><br />
                    <input type="submit" value="Submit" onClick={(event) => this.handleSubmit(event)} />
                </form>
                <ChildComponents
                    name={this.state.firstName}
                    age={'21'}
                    address={'Vinh Long'}
                    jobs={this.state.arrJobs}
                />

            </>
        )
    }
}

export default MyComponents;