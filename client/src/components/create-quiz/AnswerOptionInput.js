import React, { Component } from 'react';
import './create-quiz.css';
import { handleOnKeyPress, OPTION_EMPTY } from './quiz-utils';
import { FIELDS } from './quiz-utils';
import _ from 'lodash';

export class AnswerOptionInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            checked: false,
        };
    }

    handleOnChange = (e) => {
        // _.trimStart for removing whitespaces at the start of the text
        this.setState({ text: _.trimStart(e.target.value) }, () => {
            this.props.handleOnChange(this.state.text, this.props.index);
        });
    };

    handleOnAnswerSelectorChange = (e) => {
        this.setState({ checked: !this.state.checked }, () => {
            this.props.handleOnAnswerSelectorChange(this.state.text);
        });
    };

    renderAnswerSelector = (option) => {
        if (option !== OPTION_EMPTY) {
            return (
                <div className="correct-answer-selector" onClick={this.handleOnAnswerSelectorChange}>
                    <div className="correct-answer-selector-text">răspuns corect</div>
                    <div className="correct-answer-selector-input">
                        {
                            <input
                                type={this.props.selectorType}
                                name={FIELDS.CORRECT_ANSWER_SELECTOR}
                                onChange={() => {}}
                                value={option}
                                checked={this.props.checked}
                                className="correct-answer-selector-radio-checkbox"
                            />
                        }
                    </div>
                </div>
            );
        }
    };

    render() {
        let className = ['answer-option'];
        if (this.props.submitRequest && (this.state.text === '' || this.props.invalid)) {
            className.push('invalid');
        }
        return (
            <React.Fragment>
                <div className="col">
                    <input
                        type="text"
                        value={this.props.value}
                        name={FIELDS.ANSWER_OPTION}
                        className={className.join(' ')}
                        onChange={this.handleOnChange}
                        onKeyPress={handleOnKeyPress}
                        autoComplete="off"
                    />
                    {this.renderAnswerSelector(this.props.value)}
                </div>
            </React.Fragment>
        );
    }
}
