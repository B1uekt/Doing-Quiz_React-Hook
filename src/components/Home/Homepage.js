import videoHomePage from '../../assets/audio/video-homepage.mp4'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomePage} />
            </video>
            <div className="homepage-content">
                <div className='main-title'>{t('HomePage.maintitle')}</div>

                <div className='title'>{t('HomePage.title')}</div>
                <div className='title-btn'>
                    {isAuthenticated === false ?
                        <button onClick={() => navigate('/login')}>{t('HomePage.titlebtn.login')}</button>
                        :
                        <button onClick={() => navigate('/users')}>{t('HomePage.titlebtn.doquiz')}</button>
                    }

                </div>
            </div>
        </div>
    )
}
export default HomePage