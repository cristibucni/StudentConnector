import React, { Component } from 'react';
import './create-quiz.css';
import { FIELDS } from './quiz-utils';
import { ERRORS_INFO } from './quiz-utils';
import { handleOnKeyPress } from './quiz-utils';
import _ from 'lodash';

export class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: ERRORS_INFO.NO_TITLE,
        };
    }

    componentDidMount() {
        this.props.getTitle(() => this.state.text);
        this.props.getTitleErrors(() => this.state.errors);
    }

    handleOnTitleChange = (e) => {
        this.setState({ text: _.trimStart(e.target.value), errors: _.trimStart(e.target.value) !== '' ? '' : ERRORS_INFO.NO_TITLE });
    };

    render() {
        const errorClass = this.props.submitRequest && this.state.errors === ERRORS_INFO.NO_TITLE ? 'invalid' : '';
        const className = ['input', errorClass];
        return (
            <div className="section">
                <div className="row">
                    <div className="col-md-2">
                        <label htmlFor="title">Titlu</label>
                    </div>
                    <div className="col-md-10">
                        <input
                            type="text"
                            className={className.join(' ')}
                            name={FIELDS.TITLE}
                            onChange={this.handleOnTitleChange}
                            onKeyPress={handleOnKeyPress}
                            autoComplete="off"
                            value={this.state.text}
                        />
                    </div>
                </div>
                <div className="errors">{this.props.submitRequest && this.state.errors}</div>
            </div>
        );
    }
}
