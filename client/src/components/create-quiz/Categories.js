import React, { Component } from 'react';
import './create-quiz.css';
import { ERRORS_INFO } from './quiz-utils';
import { Category } from './Category';
import _ from 'lodash';

export class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfCategories: {
                count: 0,
                errors: ERRORS_INFO.NO_CATEGORIES,
            },
            categories: [],
            modalOpen: false,
            submitRequest: this.props.submitRequest,
        };
    }

    componentDidMount() {
        this.props.getNumberOfCategories(() => this.state.numberOfCategories.count);
        this.props.getCategories(() => this.state.categories);
    }

    handleOnAddCategoryClick = (e) => {
        this.setState({ numberOfCategories: this.getNumberOfCategories(), categories: this.getCategories() });
    };

    handleOnDeleteCategoryClick = (index) => {
        let { numberOfCategories } = this.state;
        numberOfCategories.count = numberOfCategories.count - 1;
        if (numberOfCategories.count === 0) {
            numberOfCategories.errors = ERRORS_INFO.NO_CATEGORIES;
        }
        let { categories } = this.state;
        categories[index] = {};
        const newCategories = categories.filter((category) => {
            return !_.isEmpty(category);
        });
        this.setState({ categories: newCategories, numberOfCategories: numberOfCategories });
    };

    getNumberOfCategories = () => {
        let numberOfCategories = {
            count: this.state.numberOfCategories.count + 1,
            errors: '',
        };
        if (numberOfCategories.count > 0) {
            numberOfCategories.errors = '';
        } else {
            numberOfCategories.errors = ERRORS_INFO.NO_CATEGORIES;
        }
        return numberOfCategories;
    };

    getCategories() {
        let { categories } = this.state;
        const category = {
            title: '',
            questions: [],
            errors: {
                title: ERRORS_INFO.NO_TITLE,
                questions: ERRORS_INFO.NO_QUESTIONS,
            },
        };
        categories.push(category);
        return categories;
    }

    getCategoriesErrors = (index, errors) => {
        let { categories } = this.state;
        categories[index].errors = errors;
        this.setState({ categories: categories });
    };

    handleOnCategoryTitleChange = (index, title) => {
        let { categories } = this.state;
        categories[index].title = title;
        this.setState({ categories: categories });
    };

    handleOnQuestionSubmit = (index, question) => {
        let { categories } = this.state;
        categories[index].questions.push(question);
        this.setState({ categories: categories });
    };

    render() {
        let content = [];
        for (let i = 0; i < this.state.categories.length; i++) {
            content.push(
                <div key={i} className="category-card">
                    <Category
                        key={i}
                        submitRequest={this.props.submitRequest}
                        title={this.state.categories[i].title}
                        questions={this.state.categories[i].questions}
                        index={i}
                        handleOnQuestionSubmit={this.handleOnQuestionSubmit}
                        handleOnCategoryTitleChange={this.handleOnCategoryTitleChange}
                        handleOnDeleteCategoryClick={this.handleOnDeleteCategoryClick}
                        getCategoriesErrors={this.getCategoriesErrors}
                    />
                </div>
            );
        }
        return (
            <React.Fragment>
                <div className="section">
                    Categorii întrebări{' '}
                    <button className="add" onClick={this.handleOnAddCategoryClick}>
                        {'\u271a'}
                    </button>
                    {this.props.submitRequest && <div className="errors">{this.state.numberOfCategories.errors}</div>}
                </div>
                <div className="categories">{content}</div>
            </React.Fragment>
        );
    }
}
