import React, { Component } from 'react';
import './create-quiz.css';
import { handleOnKeyPress } from './quiz-utils';
import { FIELDS } from './quiz-utils';
import { ERRORS_INFO } from './quiz-utils';
import _ from 'lodash';

export class UserInputAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: ERRORS_INFO.NO_USER_INPUT_ANSWER,
        };
    }

    componentDidMount() {
        this.props.getAnswer(() => this.state.text);
        this.props.getAnswerErrors(() => this.state.errors);
    }

    handleOnChange = e => {
        this.setState({ text: _.trimStart(e.target.value), errors: e.target.value === '' ? ERRORS_INFO.NO_USER_INPUT_ANSWER : '' });
    };

    render() {
        let className = ['input'];
        if (this.props.submitRequest && this.state.text === '') {
            className.push('invalid');
        }
        return (
            <React.Fragment>
                <div className="col">
                    <input
                        type="text"
                        value={this.state.text}
                        name={FIELDS.ANSWER_OPTION}
                        className={className.join(' ')}
                        onChange={this.handleOnChange}
                        onKeyPress={handleOnKeyPress}
                    />
                    <div className="errors">{this.props.submitRequest && this.state.errors}</div>
                </div>
            </React.Fragment>
        );
    }
}
