import React, { Component } from 'react';
import './create-quiz.css';
import { QUIZ_TYPES } from '../quiz/quiz-constants';
import { AnswerOptionsUnique } from './AnswerOptionsUnique';
import { AnswerOptionsMultiple } from './AnswerOptionsMultiple';
import { UserInputAnswer } from './UserInputAnswer';
import { TypeSelector } from './TypeSelector';
import { Title } from './Title';

const MIN_ANSWER_OPTIONS = 4;

export class AddQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: QUIZ_TYPES.MULTIPLE_CHOICES_UNIQUE_VALID,
            submitRequest: false,
        };
    }

    handleOnTypeSelect = (type) => {
        this.setState({ type: type });
    };

    getAnswerOptionsErrors = () => [];

    validateForm = () => {
        const validateMap = {
            [QUIZ_TYPES.MULTIPLE_CHOICES_UNIQUE_VALID]:
                this.getTitleErrors().length === 0 && this.getAnswerOptionsErrors().length === 0 && this.getAnswerErrors().length === 0,
            [QUIZ_TYPES.MULTIPLE_CHOICES_MULTIPLE_VALID]:
                this.getTitleErrors().length === 0 && this.getAnswerOptionsErrors().length === 0 && this.getAnswerErrors().length === 0,
            [QUIZ_TYPES.USER_INPUT]: this.getTitleErrors().length === 0 && this.getAnswerErrors().length === 0,
        };
        return validateMap[this.state.type];
    };

    getQuestionData = () => {
        const title = this.getTitle();
        const answer = this.getAnswer();
        const answerOptionsConfigMap = {
            [QUIZ_TYPES.MULTIPLE_CHOICES_UNIQUE_VALID]: this.getAnswerOptions(),
            [QUIZ_TYPES.MULTIPLE_CHOICES_MULTIPLE_VALID]: this.getAnswerOptions(),
            [QUIZ_TYPES.USER_INPUT]: [],
        };
        const answerOptions = answerOptionsConfigMap[this.state.type];
        return { title, type: this.state.type, answerOptions, answer };
    };

    handleOnQuestionSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitRequest: true }, () => {
            if (this.validateForm()) {
                this.props.onSubmit(this.getQuestionData());
            }
        });
    };

    renderTitle = () => {
        return (
            <Title
                submitRequest={this.state.submitRequest}
                getTitle={(title) => {
                    this.getTitle = title;
                }}
                getTitleErrors={(errors) => {
                    this.getTitleErrors = errors;
                }}
            />
        );
    };

    renderTypeSelector = () => {
        return (
            <div className="section">
                <TypeSelector handleOnTypeSelect={this.handleOnTypeSelect} />
            </div>
        );
    };

    renderAnswerOptionsFields = () => {
        const answerBaseProps = {
            submitRequest: this.state.submitRequest,
            getAnswer: (f) => {
                this.getAnswer = f;
            },
            getAnswerErrors: (f) => {
                this.getAnswerErrors = f;
            },
        };

        const answerComboProps = {
            ...answerBaseProps,
            count: MIN_ANSWER_OPTIONS,
            getAnswerOptions: (f) => {
                this.getAnswerOptions = f;
            },
            getAnswerOptionsErrors: (f) => {
                this.getAnswerOptionsErrors = f;
            },
        };

        const questionMap = {
            [QUIZ_TYPES.MULTIPLE_CHOICES_UNIQUE_VALID]: (
                <div className="section">
                    <label>Variante de răspuns</label>
                    <AnswerOptionsUnique {...answerComboProps} />
                </div>
            ),
            [QUIZ_TYPES.MULTIPLE_CHOICES_MULTIPLE_VALID]: (
                <div className="section">
                    <label>Variante de răspuns</label>
                    <AnswerOptionsMultiple {...answerComboProps} />
                </div>
            ),
            [QUIZ_TYPES.USER_INPUT]: (
                <div className="section">
                    <label>Răspuns</label>
                    <div className="row">
                        <UserInputAnswer {...answerBaseProps} />
                    </div>
                </div>
            ),
        };
        return questionMap[this.state.type];
    };

    render() {
        return (
            <div className="add-question-container">
                {this.renderTitle()}
                {this.renderTypeSelector()}
                {this.renderAnswerOptionsFields()}
                <input type="submit" className="btn btn-info btn-block mt-4" onClick={this.handleOnQuestionSubmit} />
            </div>
        );
    }
}
