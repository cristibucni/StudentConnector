import { SET_CURRENT_QUIZ, SET_CURRENT_QUIZ_MEMO, FINISH_CURRENT_QUIZ } from '../actions/types';
const initialState = {
    currentQuiz: '',
    currentQuizMemo: {},
    completedQuizes: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_QUIZ:
            return {
                ...state,
                currentQuiz: action.quizId,
            };
        case SET_CURRENT_QUIZ_MEMO:
            return {
                ...state,
                currentQuizMemo: action.memo,
            };
        case FINISH_CURRENT_QUIZ:
            return {
                ...state,
                currentQuiz: action.quizId,
                currentQuizMemo: {},
            };
        default:
            return state;
    }
}
