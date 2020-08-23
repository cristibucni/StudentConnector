import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentQuiz } from '../../actions/quizActions';
import { QuizContainer } from './QuizContainer';
import { QuizListItem } from './QuizListItem';
import { Link } from 'react-router-dom';
import { css } from '@emotion/core';
import { FadeLoader } from 'react-spinners';
import './styles/quiz-list.css';

const override = css`
    display: block;
    margin: auto;
    border-color: #03728b;
    position: absolute;
    top: 40%;
    left: 50%;
`;

class QuizList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizList: [],
            loading: true,
            user: {},
        };
    }

    componentDidMount() {
        axios
            .get('api/quizes/all')
            .then((response) => {
                response.data.forEach((quiz) => {
                    const quizList = response.data;
                    this.setState({ quizList: quizList }, () => {
                        axios
                            .get('api/users/current/completedQuizes')
                            .then((response) => {
                                const { data } = response;
                                this.setState({ user: data, loading: false }, () => {});
                            })
                            .catch((error) => {});
                    });
                });
            })
            .catch((error) => {});
    }

    renderQuizList = () => {
        if (this.state.loading) {
            return (
                <div className="sweet-loading">
                    <FadeLoader css={override} sizeUnit={'px'} size={150} color={'#03728b'} loading={this.state.loading} />
                </div>
            );
        }

        const completedQuizesIds = this.state.user.completedQuizes.map((quiz) => {
            return quiz.quizId;
        });

        const availableQuizesData = this.state.quizList.filter((quiz) => {
            return !completedQuizesIds.includes(quiz._id) && quiz;
        });
        const availableQuizes = availableQuizesData.map((quiz, index) => {
            return <QuizListItem data={quiz} key={index} handleOnQuizClick={this.handleOnQuizClick} completed={false} />;
        });

        const completedQuizesData = this.state.quizList.filter((quiz) => {
            return completedQuizesIds.includes(quiz._id) && quiz;
        });
        const completedQuizes = completedQuizesData.map((quiz, index) => {
            return (
                <QuizListItem
                    data={quiz}
                    key={index}
                    completed={true}
                    grade={(() => {
                        const quizItem = this.state.user.completedQuizes.find((completedQuiz) => {
                            return completedQuiz.quizId === quiz._id;
                        });
                        return quizItem.grade;
                    })()}
                />
            );
        });

        return (
            <React.Fragment>
                <div className="quizes-list-container row-schedule">
                    <div className="quizes-list-header">Modele disponibile</div>
                    <div className="quizes-list-content">
                        {availableQuizes.length === 0 ? (
                            <div className="no-quiz-found-info">
                                Ai epuizat toate modelele de examene. Poti propune un model dând click <Link to="/create-quiz">aici!</Link>
                            </div>
                        ) : (
                            availableQuizes
                        )}
                    </div>
                </div>
                <div className="quizes-list-container row-schedule">
                    <div className="quizes-list-header">Modele parcurse</div>
                    <div className="quizes-list-content">
                        {completedQuizes.length === 0 ? (
                            <div className="no-quiz-found-info">Nu ai parcurs niciun examen. O poți face apăsând butonul start pe orice examen de mai sus</div>
                        ) : (
                            completedQuizes
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    };

    handleOnQuizClick = (id) => {
        this.props.setCurrentQuiz(id);
    };

    handleOnExit = () => {
        if (window.confirm('Are you sure you want to cancel this quiz?')) {
            this.props.setCurrentQuiz(null);
        }
    };

    render() {
        return (
            <div className="quiz-list-container ">
                {/*currentQuiz saves the data of the quiz started by the user so it won't lose progress if the user decides to navigate through the app */}
                {!this.props.currentQuiz ? this.renderQuizList() : <QuizContainer currentQuiz={this.props.currentQuiz} onExit={this.handleOnExit} />}
            </div>
        );
    }
}

QuizList.propTypes = {
    setCurrentQuiz: PropTypes.func,
};

const mapStateToProps = (state) => ({
    currentQuiz: state.quiz.currentQuiz,
});

QuizList = connect(mapStateToProps, { setCurrentQuiz })(QuizList);

export { QuizList };
