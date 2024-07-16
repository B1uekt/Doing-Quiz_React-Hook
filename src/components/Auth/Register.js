import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { postRegister } from '../../services/AuthServices'
import { toast } from 'react-toastify';
import { FaRegEyeSlash, FaEye } from 'react-icons/fa';


const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const navigate = useNavigate();
    const [isShowPassword, setShowPassword] = useState(false)

    const handleBackHomePage = () => {
        navigate('/')
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmit = async () => {

        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid Email")
            return;
        }
        if (!password) {
            toast.error("Missing Password")
            return;
        }

        let res = await postRegister(email, username, password)
        // console.log(res)
        if (res && res.EC === 0) {
            navigate('/login')
            toast.success(res.EM);
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }
    const handleLogin = () => {
        navigate('/login')
    }
    return (
        <div className="login-container">
            <div className='header d-flex justify-content-end'>
                <span>Already have an account yet ? </span>
                <button className="btn-signup" onClick={() => handleLogin()}>Log In </button>
            </div>
            <div className='title mx-auto'>
                <span>React</span>
            </div>
            <div className='welcome mx-auto'>
                Start your journey
            </div>
            <div className='content col-3 mx-auto'>
                <div className="form-group">
                    <label>Email: </label>
                    <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type='email'
                        className='form-control mt-2' ></input>
                </div>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        type='text'
                        className='form-control mt-2' ></input>
                </div>
                <div className="form-group pass-group">
                    <label>Password: </label>
                    <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type={isShowPassword ? 'text' : 'password'}
                        className='form-control mt-2' />
                    {isShowPassword ?
                        <span className='icons-eye' onClick={() => setShowPassword(false)}><FaEye /></span>
                        :
                        <span className='icons-eye' onClick={() => setShowPassword(true)}><FaRegEyeSlash /></span>
                    }
                </div>
                <span>Forgot password ? </span>
                <div>
                    <button className="btn-submit my-4" onClick={() => handleSubmit()}>Log in</button>
                </div>
                <div className='text-center back'>
                    <span onClick={() => handleBackHomePage()} className='text-decoration-none'> &#60;&#60; Go to Homepage </span>
                </div>

            </div>
        </div>
    )
}
export default Register