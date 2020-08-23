import React, { Component } from 'react';
import './styles/checkbox.css';

export class Checkbox extends Component {
    render() {
        const errorClass = this.props.checked ? 'checked' : '';
        const className = ['checkbox', errorClass];
        return <span className={className.join(' ')} />;
    }
}
