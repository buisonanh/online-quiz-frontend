import axios from 'axios'

const backendUrl = "http://localhost:3000"


const register = async (user) => {
    try {
        const response = await axios.post(`${backendUrl}/register`, user);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const login = async (credentials) => {
    try {
        const response = await axios.post(`${backendUrl}/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('API login error:', error); // Debug log
        throw error;
    }
}

// quizzes
const get_all_quizzes = async () => {
    try {
        const response = await axios.get(`${backendUrl}/quizzes`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const get_quiz_by_id = async (id) => {
    try {
        const response = await axios.get(`${backendUrl}/quizzes/quiz/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const update_quiz = async (id, quiz) => {
    try {
        const response = await axios.put(`${backendUrl}/quizzes/quiz/${id}`, quiz, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error('API update quiz error:', error);
        throw error;
    }
};

const delete_quiz = async (id) => {
    try {
        const response = await axios.delete(`${backendUrl}/quizzes/quiz/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error('API delete quiz error:', error);
        throw error;
    }
};

// questions
const update_question = async (id, question) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${backendUrl}/questions/question/${id}`, question, {
        headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('API update question error:', error);
        throw error;
    }
};

const get_all_questions_by_quiz_id = async (id) => {
    try {
        const response = await axios.get(`${backendUrl}/questions/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

// attempts
const create_attempt = async (attempt) => {
    try {
        const response = await axios.post(`${backendUrl}/attempts`, attempt)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const get_attempts_by_user_id = async () => {
    try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`${backendUrl}/attempts/user/${userId}`,
            {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}})
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const get_attempt_by_id = async (id) => {
    try {
        const response = await axios.get(`${backendUrl}/attempts/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error('API get attempt by id error:', error);
        throw error;
    }
};

const delete_attempt_by_id = async (id) => {
    try {
        const response = await axios.delete(`${backendUrl}/attempts/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error('API delete attempt error:', error);
        throw error;
    }
}

const create_quiz = async (quiz) => {
    try {
        const response = await axios.post(`${backendUrl}/quizzes`, quiz, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error('API create quiz error:', error);
        throw error;
    }
}

const create_question = async (question) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${backendUrl}/questions/${question.quiz_id}`, question, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error('API create question error:', error);
        throw error;
    }
}

export const api = {
    login,
    register,
    get_all_quizzes,
    get_quiz_by_id,
    update_quiz,
    delete_quiz,
    update_question,
    get_all_questions_by_quiz_id,
    create_attempt,
    get_attempts_by_user_id,
    get_attempt_by_id,
    delete_attempt_by_id,
    create_quiz,
    create_question
}
