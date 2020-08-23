import React, { Component } from 'react';
import './styles/question.css';
export class QuestionTypeUserInput extends Component {
    handleOnChange = (e) => {
        const { title, index } = this.props;
        const answer = e.target.value;
        this.setState({ answer: answer }, () => {
            this.props.onAnswer(title, index, answer);
        });
    };

    render() {
        const { title } = this.props.questionData;
        return (
            <div className="question-container">
                <li className="question-title"> {title}</li>
                <input
                    type="text"
                    onChange={(e) => this.handleOnChange(e)}
                    defaultValue={this.props.memo}
                    placeholder=""
                    className="question-user-input-answer"
                />
            </div>
        );
    }
}
