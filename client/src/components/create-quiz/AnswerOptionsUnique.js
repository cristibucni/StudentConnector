import React, { Component } from 'react';
import './create-quiz.css';
import { AnswerOptionInput } from './AnswerOptionInput';
import { ERRORS_INFO } from './quiz-utils';
import _ from 'lodash';

export class AnswerOptionsUnique extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerOptions: this.getAnswerOptions(),
            errors: {
                answerOptions: [ERRORS_INFO.LESS_THAN_4_ANSWER_OPTIONS, ERRORS_INFO.DUPLICATE_ANSWER_OPTION],
                answer: ERRORS_INFO.NO_UNIQUE_ANSWER,
            },
            answer: undefined,
        };
    }

    componentDidMount() {
        this.props.getAnswerOptions(() => this.state.answerOptions);
        this.props.getAnswerOptionsErrors(() => this.state.errors.answerOptions);
        this.props.getAnswer(() => this.state.answer);
        this.props.getAnswerErrors(() => this.state.errors.answer);
    }

    handleOnChange = (text, index) => {
        let answerOptionsClone = this.state.answerOptions.slice();
        answerOptionsClone[index] = text;
        // Remove "answer" if the answerOption which was checked as "correct answer" is modified
        const answerClone = this.state.answerOptions[index] === this.state.answer ? undefined : this.state.answer;
        this.setState({ answer: answerClone, answerOptions: answerOptionsClone, errors: this.getErrors(answerOptionsClone, answerClone) });
    };

    getErrors = (answerOptions, answer) => {
        let errorAnswerOptionsClone = [];
        if (answerOptions.includes('')) {
            errorAnswerOptionsClone.push(ERRORS_INFO.LESS_THAN_4_ANSWER_OPTIONS);
        }
        if (_.uniq(answerOptions).length !== answerOptions.length) {
            errorAnswerOptionsClone.push(ERRORS_INFO.DUPLICATE_ANSWER_OPTION);
        }
        const errors = {
            answerOptions: errorAnswerOptionsClone,
            answer: answer === undefined || answer.length === 0 ? ERRORS_INFO.NO_UNIQUE_ANSWER : '',
        };
        return errors;
    };

    getAnswerOptions = () => {
        let answerOptions = [];
        for (let i = 0; i < this.props.count; i++) {
            answerOptions.push('');
        }
        return answerOptions;
    };

    handleOnAnswerSelectorChange = option => {
        this.setState({ answer: option, errors: this.getErrors(this.state.answerOptions, option) });
    };

    render() {
        let content = [];
        for (let i = 0; i < this.props.count; i++) {
            content.push(
                <AnswerOptionInput
                    key={i}
                    submitRequest={this.props.submitRequest}
                    index={i}
                    handleOnChange={this.handleOnChange}
                    value={this.state.answerOptions[i]}
                    selectorType="radio"
                    handleOnAnswerSelectorChange={this.handleOnAnswerSelectorChange}
                    checked={this.state.answer === this.state.answerOptions[i]}
                    invalid={_.countBy(this.state.answerOptions)[this.state.answerOptions[i]] > 1}
                />
            );
        }
        return (
            <React.Fragment>
                <div className="row">{content}</div>
                <div className="errors">
                    {this.props.submitRequest &&
                        this.state.errors.answerOptions.map((answerOptionError, index) => {
                            return <div key={index}>{answerOptionError}</div>;
                        })}
                </div>
                <div className="errors">{this.props.submitRequest && this.state.errors.answer}</div>
            </React.Fragment>
        );
    }
}
