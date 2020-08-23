import React, { Component } from 'react';
import './create-quiz.css';
import { FIELDS } from './quiz-utils';
import { QUIZ_TYPES } from '../quiz/quiz-constants';
const QUESTION_TYPES = [
    {
        label: 'Răspuns simplu',
        value: QUIZ_TYPES.MULTIPLE_CHOICES_UNIQUE_VALID,
    },
    {
        label: 'Răspuns multiplu',
        value: QUIZ_TYPES.MULTIPLE_CHOICES_MULTIPLE_VALID,
    },
    {
        label: 'Text',
        value: QUIZ_TYPES.USER_INPUT,
    },
];

export class TypeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: QUESTION_TYPES[0].value,
        };
    }
    handleOnTypeSelect = (e) => {
        this.setState({ type: e.target.value }, () => {
            this.props.handleOnTypeSelect(this.state.type);
        });
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-2">
                    <label htmlFor="type">Tip</label>
                </div>
                <div className="col-md-10">
                    <select className="dropdown-select" name={FIELDS.TYPE_SELECTOR} onChange={(e) => this.handleOnTypeSelect(e)}>
                        {QUESTION_TYPES.map((type, key) => {
                            return (
                                <option value={type.value} key={key}>
                                    {type.label}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
        );
    }
}
