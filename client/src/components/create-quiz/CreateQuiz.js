import React, { Component } from 'react';
import './create-quiz.css';
import axios from 'axios';
import { Title } from './Title';
import { Description } from './Description';
import { Categories } from './Categories';
import { FadeLoader } from 'react-spinners';
import { css } from '@emotion/core';
const override = css`
    display: block;
    margin: auto;
    margin-top: 20%;
    border-color: #03728b;
`;
export class CreateQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitRequest: false,
            loading: true,
        };
    }

    componentDidMount() {
        axios.get('/api/subjects').then((response) => {
            const subjects = response.data;
            this.setState({
                subjects,
                loading: false,
            });
        });
    }

    handleOnQuizSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitRequest: true });
        const quizData = {
            title: {
                text: this.getTitle(),
                errors: this.getTitleErrors(),
            },
            description: this.getDescription(),
            categories: this.getCategories(),
        };
        if (this.validateQuizData(quizData)) {
            axios
                .post('/api/quizes', this.formatQuiz(quizData))
                .then((response) => {
                    const { status } = response;
                    if (status === 200) {
                        window.alert('Examen adăugat cu succes!');
                        window.location.replace('http://' + window.location.host + '/quiz');
                    }
                })
                .catch((error) => {});
        }
    };

    formatQuiz = (quizData) => {
        let categories = [];
        quizData.categories.forEach((category) => {
            categories.push({
                title: category.title,
                questions: category.questions,
            });
        });
        const quiz = {
            title: quizData.title.text,
            description: quizData.description,
            categories,
        };

        return quiz;
    };

    validateQuizData = (quizData) => {
        let categoriesWithErrors = 0;
        quizData.categories.forEach((category) => {
            if (category.errors.title !== '' || category.errors.questions !== '') {
                categoriesWithErrors++;
            }
        });
        const numberOfCategories = this.getNumberOfCategories();
        if (quizData.title.errors === '' && categoriesWithErrors === 0 && numberOfCategories > 0) {
            return true;
        } else {
            return false;
        }
    };

    render() {
        return this.state.loading ? (
            <div className="sweet-loading">
                <FadeLoader css={override} sizeUnit={'px'} size={150} color={'#03728b'} loading={this.state.loading} />
            </div>
        ) : (
            <div className="create-quiz-container">
                <Title
                    submitRequest={this.state.submitRequest}
                    getTitle={(title) => {
                        this.getTitle = title;
                    }}
                    getTitleErrors={(errors) => {
                        this.getTitleErrors = errors;
                    }}
                />
                <Description
                    subjects={this.state.subjects}
                    getDescription={(title) => {
                        this.getDescription = title;
                    }}
                />
                <Categories
                    submitRequest={this.state.submitRequest}
                    getNumberOfCategories={(f) => {
                        this.getNumberOfCategories = f;
                    }}
                    getCategories={(f) => {
                        this.getCategories = f;
                    }}
                />
                <div className="submit">
                    <input type="submit" className="btn btn-info btn-block mt-4" onClick={this.handleOnQuizSubmit} />
                </div>
            </div>
        );
    }
}
