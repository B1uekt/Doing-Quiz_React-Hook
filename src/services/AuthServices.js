import axios from '../utils/axiosCustomize';

const postLogin = (UserEmail, UserPassword) => {
    return axios.post('api/v1/login', { email: UserEmail, password: UserPassword })
}



export { postLogin }