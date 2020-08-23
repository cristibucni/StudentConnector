import React, { Component } from 'react';
import './styles/quiz-list-item.css';
export class QuizListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data._id,
            title: this.props.data.title,
            description: this.props.data.description,
            completed: this.props.completed,
        };
    }

    handleOnStartClick = () => {
        this.props.handleOnQuizClick(this.state.id);
    };

    handleOnSkipClick = e => {
        this.setState({ expanded: false });
    };

    render() {
        return (
            <div className="quiz-list-item">
                <div className="row quiz-list-item-row">
                    <div className="col">
                        <div className="quiz-list-item-container">
                            <span className="quiz-list-item-title" onClick={this.handleOnTitleClick}>
                                {this.state.title}
                            </span>

                            <span className="quiz-list-item-description">{this.state.description}</span>
                        </div>
                    </div>
                    <div className="col">
                        <div className="quiz-list-item-actions">
                            {!this.state.completed ? (
                                <button className="quiz-list-item-action-button" onClick={this.handleOnStartClick}>
                                    Start
                                </button>
                            ) : (
                                <div className="quiz-list-item-score">Score: {this.props.grade} pts</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
