import axios from '../utils/axiosCustomize';

const postLogin = (UserEmail, UserPassword) => {
    return axios.post('api/v1/login', { email: UserEmail, password: UserPassword, delay: 3000 })
}

const postRegister = (email, username, password) => {
    const data = new FormData();
    data.append('email', email);
    data.append('username', username);
    data.append('password', password);
    return axios.post('api/v1/register', data)
}


export { postLogin, postRegister }