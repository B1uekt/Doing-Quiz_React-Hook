import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmitBtn = () => {
        navigate('/')
    }

    return (
        <div className="login-container">
            <div className='header d-flex justify-content-end'>
                <span>Don't have accont yet ? </span>
                <button className="btn-signup">Sign Up</button>
            </div>
            <div className='title mx-auto'>
                <span>React</span>
            </div>
            <div className='welcome mx-auto'>
                Hello, who's this ?
            </div>
            <div className='content col-3 mx-auto'>
                <form>
                    <div className="form-group">
                        <label>Email: </label>
                        <input value={email} onChange={(event) => setEmail(event.target.value)} type='email' className='form-control mt-2' required></input>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input value={password} onChange={(event) => setPassword(event.target.value)} type='password' className='form-control mt-2' required></input>
                    </div>
                    <span>Forgot password ? </span>
                    <div>
                        <button type='submit' className="btn-submit my-4">Log in</button>
                    </div>
                    <div className='text-center back'>
                        <span onClick={() => handleSubmitBtn()} className='text-decoration-none'> &#60;&#60; Go to Homepage </span>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login 
