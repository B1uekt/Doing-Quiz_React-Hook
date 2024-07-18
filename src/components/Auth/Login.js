import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/AuthServices'
import { toast } from 'react-toastify';
import { FaRegEyeSlash, FaEye } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner } from "react-icons/im";


const Login = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [isShowPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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

    const handleSubmitLogin = async () => {

        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid Email")
            return;
        }
        if (!password) {
            toast.error("Missing Password")
            return;
        }
        setIsLoading(true)
        let res = await postLogin(email, password)
        // console.log(res)
        if (res && res.EC === 0) {
            dispatch(doLogin(res))
            setIsLoading(false)
            // navigate('/')
            toast.success(res.EM);
        }
        if (res && res.EC !== 0) {
            setIsLoading(false)
            toast.error(res.EM);
            // setIsLoading(false)
        }
    }

    const handleCreateAcc = () => {
        navigate('/signup')
    }
    return (
        <div className="login-container">
            <div className='header d-flex justify-content-end'>
                <span>Don't have account yet ? </span>
                <button className="btn-signup" onClick={() => handleCreateAcc()}>Sign Up</button>
            </div>
            <div className='title mx-auto'>
                <span>React</span>
            </div>
            <div className='welcome mx-auto'>
                Hello, who's this ?
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
                    <button
                        className="btn-submit my-4"
                        onClick={() => handleSubmitLogin()} disabled={isLoading} >
                        {isLoading === true && <ImSpinner className='loader-icon' />}
                        <span>Log in</span>
                    </button>
                </div>
                <div className='text-center back'>
                    <span onClick={() => handleBackHomePage()} className='text-decoration-none'> &#60;&#60; Go to Homepage </span>
                </div>

            </div>
        </div>
    )
}
export default Login 
