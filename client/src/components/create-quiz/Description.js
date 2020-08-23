import React, { Component } from 'react';
import './create-quiz.css';
import { FIELDS } from './quiz-utils';
import { handleOnKeyPress } from './quiz-utils';
import _ from 'lodash';

export class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Algebra',
        };
    }

    componentDidMount() {
        this.props.getDescription(() => this.state.text);
    }

    handleOnDescriptionChange = (e) => {
        this.setState({ text: _.trimStart(e.target.value) });
    };

    render() {
        return (
            <div className="section">
                <div className="row">
                    <div className="col-md-2">
                        <label htmlFor="title">Materie</label>
                    </div>
                    <div className="col-md-10">
                        <select className="dropdown-select" name={FIELDS.DESCRIPTION} onChange={(e) => this.handleOnDescriptionChange(e)}>
                            {this.props.subjects.map((subject, key) => {
                                return (
                                    <option value={subject.title} key={key}>
                                        {subject.title}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}
