import axios from '../utils/axiosCustomize';

const getOverView = () => {
    return axios.get('api/v1/overview')
}
export { getOverView }