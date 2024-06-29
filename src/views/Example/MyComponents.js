import React from 'react';
import ChildComponents from './ChildComponents';
import Addcomponent from './AddComponent';


class MyComponents extends React.Component {
    state = {
        arrJobs: [
            { id: 'abcJob1', title: 'Developer', salary: '500$' },
            { id: 'abcJob2', title: 'Tester', salary: '400$' },
            { id: 'abcJob3', title: 'UX/UI', salary: '500$' },
        ]
    }
    addNewJob = (job) => {
        console.log('check job from parent', job)
        this.setState({
            arrJobs: [...this.state.arrJobs, job],
        })
    }

    render() {
        //console.log(this.state)
        return (
            <>
                <Addcomponent
                    addNewJob={this.addNewJob}
                />

                <ChildComponents
                    jobs={this.state.arrJobs}
                />

            </>
        )
    }
}

export default MyComponents;