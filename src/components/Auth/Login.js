import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/AuthServices'
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmitBtn = () => {
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

        let res = await postLogin(email, password)
        // console.log(res)
        if (res && res.EC === 0) {
            navigate('/')
            toast.success(res.EM);
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
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
                <div className="form-group">
                    <label>Email: </label>
                    <input value={email} onChange={(event) => setEmail(event.target.value)} type='email' className='form-control mt-2' ></input>
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input value={password} onChange={(event) => setPassword(event.target.value)} type='password' className='form-control mt-2' ></input>
                </div>
                <span>Forgot password ? </span>
                <div>
                    <button className="btn-submit my-4" onClick={() => handleSubmitLogin()}>Log in</button>
                </div>
                <div className='text-center back'>
                    <span onClick={() => handleSubmitBtn()} className='text-decoration-none'> &#60;&#60; Go to Homepage </span>
                </div>

            </div>
        </div>
    )
}
export default Login 
