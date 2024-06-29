import React from 'react';

class ChildComponents extends React.Component {
    state = {
        showJobs: false,
    }
    handleShowHideData = () => {
        this.setState({
            showJobs: !this.state.showJobs,
        })
    }

    render() {

        let { jobs } = this.props
        let { showJobs } = this.state
        console.log(showJobs)
        return (
            <>
                {!showJobs ?
                    <>
                        <div onClick={() => this.handleShowHideData()}><button>Show</button></div>
                    </>
                    :
                    <>
                        <div className='job-list'>
                            {
                                jobs.map((item, index) => {
                                    return (


                                        <div key={item.id}>
                                            {item.title} - {item.salary}
                                        </div>



                                    )
                                })
                            }
                        </div>
                        <div onClick={() => this.handleShowHideData()}><button>Hide</button></div>
                    </>}
            </>
        )
    }
}

export default ChildComponents;