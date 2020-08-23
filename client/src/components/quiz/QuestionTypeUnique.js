import React, { Component } from 'react';
import './styles/question.css';

export class QuestionTypeUnique extends Component {
    handleOnClick = selectedAnswer => {
        const { title, index } = this.props;
        if (this.props.memo === selectedAnswer) {
            selectedAnswer = null;
        }
        this.props.onAnswer(title, index, selectedAnswer);
    };

    renderAnswerOptions = answers => {
        return answers.map((item, key) => {
            const activeClass = this.props.memo === item ? 'active' : '';
            const className = ['question-answer', activeClass];
            return (
                <div className={className.join(' ')} onClick={e => this.handleOnClick(item)} key={key}>
                    {item}
                </div>
            );
        });
    };

    render() {
        const { title, answerOptions } = this.props.questionData;
        return (
            <div className="question-container">
                <li className="question-title"> {title}</li>
                {this.renderAnswerOptions(answerOptions)}
            </div>
        );
    }
}
