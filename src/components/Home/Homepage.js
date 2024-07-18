import videoHomePage from '../../assets/audio/video-homepage.mp4'
const HomePage = (props) => {

    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomePage} />
            </video>
            <div className="homepage-content">
                <div className='main-title'>There's a better way to ask</div>
                <div className='title'>You don't want to make boring form. and your audience won't answer one. Create a typeform instead- and make everyone happy.</div>
                <div className='title-btn'>
                    <button>Get's started.It's free</button>
                </div>
            </div>
        </div>
    )
}
export default HomePage