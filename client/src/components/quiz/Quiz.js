import React, { Component } from 'react';
import { QUIZ_TYPES } from './quiz-constants';
import './styles/quiz.css';
import { QuestionTypeUnique } from './QuestionTypeUnique';
import { QuestionTypeMultiple } from './QuestionTypeMultiple';
import { QuestionTypeUserInput } from './QuestionTypeUserInput';
import _ from 'lodash';
export class Quiz extends Component {
    handleOnAnswer = (cateogryTitle, index, selectedAnswer) => {
        this.props.onAnswer(cateogryTitle, index, selectedAnswer);
    };

    renderQuestion = (title, questions) => {
        return questions.map((item, index) => {
            switch (item.type) {
                case QUIZ_TYPES.MULTIPLE_CHOICES_UNIQUE_VALID:
                    return (
                        <QuestionTypeUnique
                            onAnswer={this.handleOnAnswer}
                            questionData={item}
                            memo={_.get(this.props.memo[title], [index])}
                            key={item.title}
                            index={index}
                            title={title}
                        />
                    );
                case QUIZ_TYPES.MULTIPLE_CHOICES_MULTIPLE_VALID:
                    return (
                        <QuestionTypeMultiple
                            onAnswer={this.handleOnAnswer}
                            questionData={item}
                            memo={_.get(this.props.memo[title], [index])}
                            key={item.title}
                            index={index}
                            title={title}
                        />
                    );
                case QUIZ_TYPES.USER_INPUT:
                    return (
                        <QuestionTypeUserInput
                            onAnswer={this.handleOnAnswer}
                            questionData={item}
                            memo={_.get(this.props.memo[title], [index])}
                            key={item.title}
                            index={index}
                            title={title}
                        />
                    );
                default:
                    return 'No questions';
            }
        });
    };

    render() {
        const { questions, title } = this.props.config;
        return (
            <div className="quiz-wrapper">
                <button onClick={e => this.props.onExit()} className="quiz-exit-button">
                    &#10006;
                </button>
                <div className="quiz-category-title">{title}</div>
                <div className="quiz-container">
                    <ul className="quiz-question-ul">{this.renderQuestion(title, questions)}</ul>
                </div>
            </div>
        );
    }
}
