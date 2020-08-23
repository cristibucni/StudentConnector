import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import { QUIZ_TYPES, QUIZ_POINTS } from './quiz-constants';
import './styles/quiz-results.css';

const RESULT_TYPE = {
    USER_ANSWERS: 'userAnswers',
    EXPECTED_ANSWERS: 'expectedAnswers',
};

export class QuizResults extends Component {
    constructor(props) {
        super(props);
        this.results = this.props.location.state.memo;
        this.data = this.props.location.state.data;
        this.scoredPoints = this.getScoredPoints();
    }

    componentDidMount() {
        const quizData = {
            quizId: this.props.location.state.data._id,
            grade: this.scoredPoints,
        };
        axios
            .post('api/users/current/completedQuizes', quizData)
            .then((response) => {})
            .catch((error) => {});
    }

    getScoredPoints = () => {
        let points = 0;
        this.data.content.forEach((categoryObject) => {
            categoryObject.questions.forEach((questionTemplate, index) => {
                switch (questionTemplate.type) {
                    case QUIZ_TYPES.MULTIPLE_CHOICES_UNIQUE_VALID:
                        return (points += this.getScoreUnique(categoryObject.title, index, questionTemplate.answer));
                    case QUIZ_TYPES.MULTIPLE_CHOICES_MULTIPLE_VALID:
                        return (points += this.getScoreMultiple(categoryObject.title, index, questionTemplate.answer));
                    case QUIZ_TYPES.USER_INPUT:
                        return (points += this.getScoreUserInput(categoryObject.title, index, questionTemplate.answer));
                    default:
                        return 0;
                }
            });
        });
        return points < 0 ? 0 : points; //points can go below 0 because you get minus points for questions with type multiple answer
    };

    getScoreUnique = (title, index, questionAnswer) => {
        if (_.get(this.results[title], [index]) === questionAnswer) {
            return QUIZ_POINTS.CORRECT_ANSWER;
        } else {
            return QUIZ_POINTS.INCORRECT_ANSWER;
        }
    };

    getScoreUserInput = (title, index, questionAnswer) => {
        if (_.get(this.results[title], [index]) === questionAnswer) {
            return QUIZ_POINTS.CORRECT_ANSWER;
        } else {
            return QUIZ_POINTS.INCORRECT_ANSWER;
        }
    };

    getScoreMultiple = (title, index, questionAnswer) => {
        let pointsForMultiple = 0;
        questionAnswer.forEach((option) => {
            if (_.get(this.results[title], [index, option]) === true) {
                pointsForMultiple += QUIZ_POINTS.CORRECT_ANSWER / questionAnswer.length;
            } else {
                pointsForMultiple -= QUIZ_POINTS.CORRECT_ANSWER / (2 * questionAnswer.length);
            }
        });
        return pointsForMultiple;
    };

    renderUnique = (title, index, item, resultType) => {
        return (
            <div className="quiz-results-question-container">
                <li className="quiz-results-question-title">{item.title}</li>
                {item.answerOptions.map((answerOption, key) => {
                    let additionalClass;
                    if (resultType === RESULT_TYPE.USER_ANSWERS) {
                        additionalClass = _.get(this.results[title], [index]) === answerOption ? 'active' : '';
                    } else if (resultType === RESULT_TYPE.EXPECTED_ANSWERS) {
                        additionalClass = item.answer === answerOption ? 'valid' : '';
                    }
                    const className = ['quiz-results-answer', additionalClass];
                    return (
                        <div key={key} className={className.join(' ')}>
                            {answerOption}
                        </div>
                    );
                })}
            </div>
        );
    };

    renderMultiple = (title, index, item, resultType) => {
        return (
            <div className="quiz-results-question-container">
                <li className="quiz-results-question-title">{item.title}</li>
                {item.answerOptions.map((answerOption, key) => {
                    let additionalClass;
                    if (resultType === RESULT_TYPE.USER_ANSWERS) {
                        additionalClass = _.get(this.results[title], [index, answerOption]) ? 'active' : '';
                    } else if (resultType === RESULT_TYPE.EXPECTED_ANSWERS) {
                        additionalClass = item.answer.includes(answerOption) ? 'valid' : '';
                    }
                    const className = ['quiz-results-answer', additionalClass];
                    return (
                        <div key={key} className={className.join(' ')}>
                            {answerOption}
                        </div>
                    );
                })}
            </div>
        );
    };

    renderUserInput = (title, index, item, resultType) => {
        let additionalClass, content;
        if (resultType === RESULT_TYPE.USER_ANSWERS) {
            additionalClass = 'quiz-results-answer';
            content = _.get(this.results[title], [index]) || '-';
        } else if (resultType === RESULT_TYPE.EXPECTED_ANSWERS) {
            additionalClass = 'valid';
            content = item.answer;
        }
        const className = ['quiz-results-answer', additionalClass];
        return (
            <div className="quiz-results-question-container">
                <li className="quiz-results-question-title">{item.title}</li>
                <div className={className.join(' ')}>{content}</div>
            </div>
        );
    };

    render() {
        //----Each method in this group is called twice for each question so we can render user's choices and correct answers as columns
        const quizResults = this.data.content.map((categoryConfig, index) => {
            return (
                <React.Fragment key={index}>
                    <div className="quiz-results-category-title">{categoryConfig.title}</div>
                    {categoryConfig.questions.map((questionData, index) => {
                        switch (questionData.type) {
                            case QUIZ_TYPES.MULTIPLE_CHOICES_UNIQUE_VALID:
                                return (
                                    <div className="row" key={index}>
                                        <div className="col">{this.renderUnique(categoryConfig.title, index, questionData, RESULT_TYPE.USER_ANSWERS)}</div>
                                        <div className="col">{this.renderUnique(categoryConfig.title, index, questionData, RESULT_TYPE.EXPECTED_ANSWERS)}</div>
                                    </div>
                                );
                            case QUIZ_TYPES.MULTIPLE_CHOICES_MULTIPLE_VALID:
                                return (
                                    <div className="row" key={index}>
                                        <div className="col">{this.renderMultiple(categoryConfig.title, index, questionData, RESULT_TYPE.USER_ANSWERS)}</div>
                                        <div className="col">
                                            {this.renderMultiple(categoryConfig.title, index, questionData, RESULT_TYPE.EXPECTED_ANSWERS)}
                                        </div>
                                    </div>
                                );
                            case QUIZ_TYPES.USER_INPUT:
                                return (
                                    <div className="row" key={index}>
                                        <div className="col">{this.renderUserInput(categoryConfig.title, index, questionData, RESULT_TYPE.USER_ANSWERS)}</div>
                                        <div className="col">
                                            {this.renderUserInput(categoryConfig.title, index, questionData, RESULT_TYPE.EXPECTED_ANSWERS)}
                                        </div>
                                    </div>
                                );
                            default:
                                return '';
                        }
                    })}
                </React.Fragment>
            );
        });
        return (
            <React.Fragment>
                <li className="quiz-results-question-title">Ai obținut: {this.scoredPoints} puncte</li>
                <hr />
                {quizResults}
            </React.Fragment>
        );
    }
}
