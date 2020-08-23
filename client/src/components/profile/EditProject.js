import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { handleErrors } from '../../utils/handleErrors';
import './profile.css';

export class EditProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name,
            technologyStack: !_.isEmpty(this.props.data.technologyStack) ? this.props.data.technologyStack.toString() : '',
            members: !_.isEmpty(this.props.data.members) ? this.props.data.members.toString() : '',
            _id: _.get(this.props.data, '_id'),
        };
        this.onChange = this.onChange.bind(this);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { name, technologyStack, members, _id } = this.state;
        const projectData = {
            name,
            technologyStack: !_.isEmpty(technologyStack) ? technologyStack.split(',') : null,
            members: !_.isEmpty(members) ? members.split(',') : null,
        };
        axios
            .put('/api/projects/' + _id, projectData)
            .then((response) => {
                const { status } = response;
                if (status === 200) {
                    window.alert('Proiect editat cu succes!');
                    window.location.reload(true);
                }
            })
            .catch((error) => {
                handleErrors(error.response.data);
            });
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { name, technologyStack, members } = this.state;
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="section">
                            <div className="row">
                                <div className="col-md-2">Nume</div>
                                <div className="col-md-10">
                                    <input type="text" value={name} placeholder="Project Name" name="name" onChange={this.onChange} className="input" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="section">
                            <div className="row">
                                <div className="col-md-2">Tehnologii: </div>
                                <div className="col-md-10">
                                    {' '}
                                    <input
                                        type="text"
                                        value={technologyStack}
                                        placeholder="Technologies used"
                                        name="technologyStack"
                                        onChange={this.onChange}
                                        className="input"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="section">
                            <div className="row">
                                <div className="col-md-2">Members</div>
                                <div className="col-md-10">
                                    <input
                                        type="text"
                                        name="members"
                                        value={members}
                                        placeholder="Project members"
                                        onChange={this.onChange}
                                        className="input"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
            </React.Fragment>
        );
    }
}
