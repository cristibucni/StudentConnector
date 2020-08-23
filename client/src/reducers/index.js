import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import quizReducer from './quizReducer';

export default combineReducers({
    auth: authReducer,
    quiz: quizReducer,
    errors: errorReducer,
});
