import { SET_CURRENT_QUIZ } from './types';
import { SET_CURRENT_QUIZ_MEMO } from './types';
import { FINISH_CURRENT_QUIZ } from './types';
const setCurrentQuiz = quizId => dispatch => {
    dispatch({
        type: SET_CURRENT_QUIZ,
        quizId,
    });
};

let setCurrentQuizMemo = memo => dispatch => {
    dispatch({
        type: SET_CURRENT_QUIZ_MEMO,
        memo,
    });
};

const finishCurrentQuiz = () => dispatch => {
    dispatch({
        type: FINISH_CURRENT_QUIZ,
        quizId: '',
        memo: '',
    });
};

export { setCurrentQuiz, setCurrentQuizMemo, finishCurrentQuiz };
