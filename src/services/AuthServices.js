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

const postLogOut = (email, refresh_token) => {
    return axios.post('api/v1/logout', {
        email, refresh_token
    })
}
export { postLogin, postRegister, postLogOut }