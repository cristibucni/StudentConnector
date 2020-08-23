import React, { Component } from 'react';
import _ from 'lodash';

import { Checkbox } from './Checkbox';
import './styles/question.css';

export class QuestionTypeMultiple extends Component {
    handleOnClick = selectedAnswer => {
        const { title, index } = this.props;
        const memoDeepCopy = _.cloneDeep(this.props.memo);
        // memoDeepCopy clones memo so it can handle user answer (if the answer exists, it sets the answer to false, if it doesn't, it sets the answer to true)
        memoDeepCopy[selectedAnswer] = !memoDeepCopy[selectedAnswer];
        this.props.onAnswer(title, index, memoDeepCopy);
    };

    renderAnswerOptions = answerOptions => {
        return answerOptions.map((answer, key) => {
            const activeClass = _.get(this.props.memo, [answer]) ? 'active' : '';
            const className = ['question-answer', activeClass];
            return (
                <div className={className.join(' ')} onClick={e => this.handleOnClick(answer)} key={key}>
                    {answer}
                    <Checkbox checked={_.get(this.props.memo, [answer])} />
                </div>
            );
        });
    };

    render() {
        const { title, answerOptions } = this.props.questionData;
        return (
            <div className="question-container">
                <li className="question-title">{title}</li>
                {this.renderAnswerOptions(answerOptions)}
            </div>
        );
    }
}
