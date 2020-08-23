import React, { Component } from 'react';
import { Quiz } from './Quiz';
import { QUIZ_TYPES } from './quiz-constants';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentQuizMemo } from '../../actions/quizActions';
import { finishCurrentQuiz } from '../../actions/quizActions';
import { css } from '@emotion/core';
import { PropagateLoader } from 'react-spinners';
import './styles/quiz-container.css';
const override = css`
    display: block;
    margin: auto;
    border-color: #03728b;
    position: absolute;
    top: 40%;
    left: 50%;
`;
class QuizContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.currentQuiz,
            data: {},
            loading: true,
            currentCategoryIndex: 0,
            //Memo stores questions' ID as key and the chosen/given answers as values; for type multiple, the stored answer will be an object
            memo: this.props.currentQuizMemo,
        };
    }

    componentDidMount() {
        axios
            .get('api/quizes/' + this.state.id)
            .then((response) => {
                const { data } = response;
                this.setState({ data: data, loading: false }, () => {
                    if (_.isEmpty(this.props.currentQuizMemo)) {
                        this.setState({ memo: this.getInitialMemo() });
                    }
                });
            })
            .catch((error) => {});
    }

    getInitialMemo = () => {
        let initialMemo = {};
        this.state.data.content.map((questionObject) => {
            return questionObject.questions.map((questionTemplate, index) => {
                switch (questionTemplate.type) {
                    case QUIZ_TYPES.MULTIPLE_CHOICES_UNIQUE_VALID:
                        return _.set(initialMemo, [questionObject.title, index], this.getInitialMemoUnique());
                    case QUIZ_TYPES.MULTIPLE_CHOICES_MULTIPLE_VALID:
                        return _.set(initialMemo, [questionObject.title, index], this.getInitialMemoMultiple(questionTemplate));
                    case QUIZ_TYPES.USER_INPUT:
                        return _.set(initialMemo, [questionObject.title, index], this.getInitialMemoUserInput());
                    default:
                        return {};
                }
            });
        });
        return initialMemo;
    };

    getInitialMemoMultiple = (questionTemplate) => {
        let multipleAnswerObject = {};
        const { answerOptions } = questionTemplate;
        for (let i = 0; i < answerOptions.length; i++) {
            multipleAnswerObject[answerOptions[i]] = false;
        }
        return multipleAnswerObject;
    };

    getInitialMemoUnique = () => {
        return null;
    };

    getInitialMemoUserInput = () => {
        return '';
    };

    handleNextClick = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            currentCategoryIndex: prevState.currentCategoryIndex + 1,
        }));
    };

    handleOnAnswer = (title, index, selectedAnswer) => {
        this.setState(
            (prevState) => ({
                memo: {
                    ...prevState.memo,
                    [title]: {
                        ...prevState.memo[title],
                        [index]: selectedAnswer,
                    },
                },
            }),
            () => this.props.setCurrentQuizMemo(this.state.memo)
        );
    };

    renderNextButton = () => {
        return (
            <button onClick={this.handleNextClick} className="quiz-container-action-button">
                Următor
            </button>
        );
    };

    renderSubmitButton = () => {
        return (
            <Link
                className="quiz-container-action-button"
                to={{
                    pathname: '/quiz-results',
                    state: {
                        data: this.state.data,
                        memo: this.state.memo,
                    },
                }}>
                Submit
            </Link>
        );
    };

    renderBreadcrumbs = () => {
        return this.state.data.content.map((item, index) => {
            return (
                <li
                    className={index === this.state.currentCategoryIndex ? 'quiz-container-span-round-tabs-active' : 'quiz-container-span-round-tabs'}
                    onClick={(e) => this.handleBreadcrumbClick(e, index)}
                    key={index}
                />
            );
        });
    };

    handleBreadcrumbClick = (e, index) => {
        e.preventDefault();
        this.setState({ currentCategoryIndex: index });
    };

    handleOnExit = () => {
        this.props.onExit();
        this.props.setCurrentQuizMemo({});
    };

    onFinish = () => {
        this.props.finishCurrentQuiz();
    };

    renderQuiz = () => {
        const actionButton = (
            <div className="quiz-container-page-controls">
                {this.state.currentCategoryIndex !== this.state.data.content.length - 1 ? (
                    this.renderNextButton()
                ) : (
                    <span onClick={this.onFinish}>{this.renderSubmitButton()}</span>
                )}
            </div>
        );
        return (
            <React.Fragment>
                <Quiz
                    config={_.get(this.state.data.content, [this.state.currentCategoryIndex])}
                    onAnswer={this.handleOnAnswer}
                    memo={this.state.memo}
                    onExit={this.handleOnExit}
                    index={this.state.currentCategoryIndex}
                />
                {actionButton}
                <div className="quiz-container-breadcrumbs">{this.renderBreadcrumbs()}</div>
            </React.Fragment>
        );
    };

    render() {
        return this.state.loading === true ? (
            <div className="sweet-loading">
                <PropagateLoader css={override} sizeUnit={'px'} size={15} color={'#03728b'} loading={this.state.loading} />
            </div>
        ) : (
            this.renderQuiz()
        );
    }
}

QuizContainer.propTypes = {
    setCurrentQuizMemo: PropTypes.func,
    finishCurrentQuiz: PropTypes.func,
};

const mapStateToProps = (state) => ({
    currentQuizMemo: state.quiz.currentQuizMemo,
});

QuizContainer = connect(mapStateToProps, { setCurrentQuizMemo, finishCurrentQuiz })(QuizContainer);

export { QuizContainer };
