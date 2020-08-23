import React, { Component } from 'react';
class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            deadline: '',
            errorMessage: 'You already have this task',
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = () => {
        const data = {
            name: this.state.name,
            deadline: this.state.deadline,
        };
        this.props.onSubmit(data);
        this.setState({ name: 'Algebra', deadline: '' });
    };

    handleOnTypeSelect = (e) => {
        this.setState({ name: e.target.value });
    };

    render() {
        return (
            <div className="container">
                <div className="tasks-header">Salvează examen</div>
                <br />
                <div>
                    <select className="dropdown-select" name="name" onChange={(e) => this.handleOnTypeSelect(e)}>
                        {this.props.subjects.map((subject, key) => {
                            return (
                                <option value={subject.title} key={key}>
                                    {subject.title}
                                </option>
                            );
                        })}
                    </select>

                    <br />
                    <br />

                    <input
                        type="date"
                        id="start"
                        className="date-input"
                        name="deadline"
                        onChange={this.onChange}
                        value={this.state.deadline}
                        max="2099/12/31"
                    />
                    <input type="submit" className="btn btn-info btn-block mt-4" onClick={this.onSubmit} />
                    {this.props.duplicateTitle && this.state.errorMessage}
                </div>
            </div>
        );
    }
}

export default AddItem;
