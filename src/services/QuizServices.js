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

const postCreateNewQuiz = (description, quizName, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', quizName);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.post(`api/v1/quiz`, data);
}

export { getQuizByUser, getDataQuiz, postAnswers, postCreateNewQuiz }