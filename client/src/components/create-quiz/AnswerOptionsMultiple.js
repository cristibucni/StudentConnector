import React, { Component } from 'react';
import './create-quiz.css';
import { AnswerOptionInput } from './AnswerOptionInput';
import { ERRORS_INFO } from './quiz-utils';
import _ from 'lodash';

export class AnswerOptionsMultiple extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerOptions: this.getAnswerOptions(),
            errors: {
                answerOptions: [ERRORS_INFO.LESS_THAN_4_ANSWER_OPTIONS, ERRORS_INFO.DUPLICATE_ANSWER_OPTION],
                answer: ERRORS_INFO.NO_MULTIPLE_ANSWER,
            },
            answer: [],
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
        this.setState({
            answer: this.state.answer.includes(this.state.answerOptions[index])
                ? this.state.answer.filter(answer => answer !== this.state.answerOptions[index])
                : this.state.answer,
            answerOptions: answerOptionsClone,
            errors: this.getErrors(answerOptionsClone, this.state.answer),
        });
    };

    getErrors = (answerOptions, answer) => {
        let errorAnswerOptionsClone = [];
        if (answerOptions.includes('')) {
            errorAnswerOptionsClone.push(ERRORS_INFO.LESS_THAN_4_ANSWER_OPTIONS);
        }
        if (_.uniq(answerOptions).length !== answerOptions.length) {
            errorAnswerOptionsClone.push(ERRORS_INFO.DUPLICATE_ANSWER_OPTION);
        }
        let count = 0;
        answerOptions.forEach(answerOption => {
            if (_.trimStart(answerOption).length !== answerOption.length) {
                count++;
            }
        });
        if (count > 0) {
            errorAnswerOptionsClone.push(ERRORS_INFO.ANSWER_OPTION_WHITE_SPACE);
        }
        const errors = {
            answerOptions: errorAnswerOptionsClone,
            answer: answer.length === 0 ? ERRORS_INFO.NO_MULTIPLE_ANSWER : '',
        };
        return errors;
    };

    getAnswerOptions = () => {
        const answerOptions = [];
        for (let i = 0; i < this.props.count; i++) {
            answerOptions.push('');
        }
        return answerOptions;
    };

    handleOnAnswerSelectorChange = option => {
        let answerClone = this.state.answer;
        if (answerClone.includes(option)) {
            answerClone = answerClone.filter(answer => option !== answer);
        } else {
            answerClone.push(option);
        }
        this.setState({ answer: answerClone, errors: this.getErrors(this.state.answerOptions, answerClone) });
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
                    selectorType="checkbox"
                    value={this.state.answerOptions[i]}
                    handleOnAnswerSelectorChange={this.handleOnAnswerSelectorChange}
                    checked={this.state.answer.includes(this.state.answerOptions[i])}
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
