import React from 'react';

class MyComponents extends React.Component {
    state = {
        name: 'Zeust',
        age: 21
    }

    handleOnChangeName(event) {
        this.setState({
            name: event.target.value
        })

    }
    render() {

        return (
            <>
                <div className="first">
                    <input value={this.state.name} type="text" onChange={(event) => this.handleOnChangeName(event)} />

                    My name is {this.state.name}
                </div>
                <div className="second">
                    Age: {this.state.age}
                </div>
            </>
        )
    }
}

export default MyComponents;