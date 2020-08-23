import React, { Component } from 'react';
import './create-quiz.css';
import Modal from 'react-responsive-modal';
import { AddQuestion } from './AddQuestion';
import _ from 'lodash';
import { handleOnKeyPress, ERRORS_INFO } from './quiz-utils';

const NO_ERROR_TEXT = '';

export class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            title: '',
            questions: [],
            errors: {
                title: undefined,
                questions: undefined,
            },
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.submitRequest && this.state.errors.title === undefined && this.state.errors.questions === undefined) {
            this.setState({ errors: this.getErrors(this.state.title, this.state.questions.length) });
        }
    }

    openModal = (e) => {
        e.preventDefault();
        this.setState({ openModal: true });
    };

    closeModal = () => {
        this.setState({ openModal: false });
    };

    handleOnCategoryTitleChange = (e) => {
        let title = _.trimStart(e.target.value);
        this.setState({ title: title, errors: this.getErrors(title, this.state.questions.length) }, () => {
            this.props.handleOnCategoryTitleChange(this.props.index, title);
            this.props.getCategoriesErrors(this.props.index, this.state.errors);
        });
    };

    handleOnQuestionSubmit = (question) => {
        let questionsClone = this.state.questions.slice();
        questionsClone.push(question);
        this.setState({ questions: questionsClone, openModal: false, errors: this.getErrors(this.state.title, questionsClone.length) }, () => {
            this.props.handleOnQuestionSubmit(this.props.index, question);
            this.props.getCategoriesErrors(this.props.index, this.state.errors);
        });
    };

    renderModal = () => {
        return (
            <Modal open={this.state.openModal} onClose={this.closeModal} center>
                <AddQuestion onSubmit={this.handleOnQuestionSubmit} categoryIndex={this.state.categoryToEdit} />
            </Modal>
        );
    };

    renderQuestions = () => {
        const questions = this.props.questions;
        if (_.isEmpty(questions)) {
            return null;
        }

        return (
            <div className="questions-list">
                <ul>
                    {questions.map((question, key) => {
                        return <li key={key}>{question.title}</li>;
                    })}
                </ul>
            </div>
        );
    };

    getErrors = (title, numberOfQuestions) => {
        let { errors } = this.state;
        if (title !== '') {
            errors.title = NO_ERROR_TEXT;
        } else {
            errors.title = ERRORS_INFO.NO_TITLE;
        }
        if (numberOfQuestions > 0) {
            errors.questions = NO_ERROR_TEXT;
        } else {
            errors.questions = ERRORS_INFO.NO_QUESTIONS;
        }
        return errors;
    };

    handleOnDeleteCategoryClick = (e) => {
        this.props.handleOnDeleteCategoryClick(this.props.index);
    };

    render() {
        const errorClass = this.state.errors.title === ERRORS_INFO.NO_TITLE && this.props.submitRequest ? 'invalid' : '';
        const className = ['input', errorClass];
        return (
            <React.Fragment>
                <div className="category-card-header">
                    <button onClick={this.handleOnDeleteCategoryClick} className="delete-category-button">
                        &#10006;
                    </button>
                    <div className="category-name">
                        <div className="row">
                            <div className="col-md-2">
                                <label>Titlu categorie</label>
                            </div>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className={className.join(' ')}
                                    onChange={this.handleOnCategoryTitleChange}
                                    name="title"
                                    onKeyPress={handleOnKeyPress}
                                    autoComplete="off"
                                    value={this.props.title}
                                />
                            </div>
                        </div>
                        {this.props.submitRequest && <div className="errors">{this.state.errors.title}</div>}
                    </div>
                </div>
                <div className="category-card-body rounded-bottom">
                    Întrebări{' '}
                    <span name="modal" onClick={(e) => this.openModal(e)} className="add">
                        {'\u271a'}
                    </span>
                    {this.props.submitRequest && <div className="errors">{this.state.errors.questions}</div>}
                    {this.renderModal()}
                    {this.renderQuestions()}
                </div>
            </React.Fragment>
        );
    }
}
