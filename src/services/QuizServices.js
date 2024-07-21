import axios from '../utils/axiosCustomize';

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
}
const getDataQuiz = (quizId) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
}

const postAnswers = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data });
}
export { getQuizByUser, getDataQuiz, postAnswers }