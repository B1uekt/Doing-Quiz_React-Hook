import './DashBoard.scss'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { getOverView } from '../../../services/DashBoardServices';
import { useState, useEffect } from 'react';

const Dashboard = (props) => {

    const [dataOverView, setDataOverView] = useState([])
    const [dataChart, setDataChart] = useState([])

    useEffect(() => {
        const fetchDataOverView = async () => {
            let res = await getOverView()
            if (res && res.EC === 0) {
                setDataOverView(res.DT)

                let Qz = 0, Qs = 0, As = 0
                Qz = res?.DT?.others?.countQuiz ?? 0
                Qs = res?.DT?.others?.countQuestions ?? 0
                As = res?.DT?.others?.countAnswers ?? 0
                const data = [
                    {
                        "name": "Quiz",
                        "Total": Qz,

                    },
                    {
                        "name": "Questions",
                        "Total": Qs,
                    },
                    {
                        "name": "Answers",
                        "Total": As,
                    }
                ]
                setDataChart(data)
            }
        }
        fetchDataOverView()
    }, [])

    return (
        <div className="dashboard-container">
            <div className='title'>
                Analytics Dashboard
            </div>
            <hr />
            <div className='dashboard-content d-flex'>
                <div className='left-content d-flex'>
                    <div className='child'>
                        <span className='text-1'>Total User</span>
                        <span className='text-2'>
                            {
                                dataOverView && dataOverView.users && dataOverView.users.total ? dataOverView.users.total : 0
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Quiz</span>
                        <span className='text-2'>
                            {
                                dataOverView && dataOverView.others && dataOverView.others.countQuiz ? dataOverView.others.countQuiz : 0
                            }
                        </span>

                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Questions</span>
                        <span className='text-2'>
                            {
                                dataOverView && dataOverView.others && dataOverView.others.countQuestions ? dataOverView.others.countQuestions : 0
                            }
                        </span>

                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Answers</span>
                        <span className='text-2'>
                            {
                                dataOverView && dataOverView.others && dataOverView.others.countAnswers ? dataOverView.others.countAnswers : 0
                            }
                        </span>

                    </div>
                </div>
                <div className='right-content '>
                    <ResponsiveContainer width="95%" height="100%">
                        <BarChart data={dataChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Total" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
export default Dashboard