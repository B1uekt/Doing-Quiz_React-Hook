import videoHomePage from '../../assets/audio/video-homepage.mp4'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomePage} />
            </video>
            <div className="homepage-content">
                <div className='main-title'>There's a better way to ask</div>
                <div className='title'>You don't want to make boring form. and your audience won't answer one. Create a typeform instead- and make everyone happy.</div>
                <div className='title-btn'>
                    {isAuthenticated === false ?
                        <button onClick={() => navigate('/login')}>Get's started.It's free</button>
                        :
                        <button onClick={() => navigate('/users')}>Doing Quiz Now</button>
                    }

                </div>
            </div>
        </div>
    )
}
export default HomePage