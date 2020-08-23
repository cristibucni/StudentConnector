import React, { Component } from 'react';
import axios from 'axios';
import './profile.css';
import { handleErrors } from '../../utils/handleErrors';
export class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            createdAt: '',
            createdBy: '',
            technologyStack: [],
            members: [],
            status: {},
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { name, technologyStack, members } = this.state;
        const projectData = {
            name,
            technologyStack: technologyStack.length > 0 ? technologyStack.split(',') : null,
            members: members.length > 0 ? members.split(',') : null,
        };
        axios
            .post('/api/projects', projectData)
            .then((response) => {
                const { status } = response;
                if (status === 200) {
                    window.alert('Proiect adăugat cu succes!');
                    window.location.reload(true);
                }
            })
            .catch((error) => {
                handleErrors(error.response.data);
            });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-2">Nume</div>
                            <div className="col-md-10">
                                <input type="text" name="name" onChange={this.onChange} className="input" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-2"> Tehnologii</div>
                            <div className="col-md-10">
                                <input type="text" name="technologyStack" onChange={this.onChange} className="input" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-2">Membri</div>
                            <div className="col-md-10">
                                {' '}
                                <input type="text" name="members" onChange={this.onChange} className="input" />
                            </div>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
            </React.Fragment>
        );
    }
}
