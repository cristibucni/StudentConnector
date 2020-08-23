import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import axios from 'axios';
import { ProjectItems } from './ProjectItems';
import { AddProject } from './AddProject';
import { ModalConfig } from './ModalConfig';
import './profile.css';

const MODAL_CONFIG = {
    id: 'addProjects',
    title: 'Add a project',
    buttonLabel: '\u271A',
    buttonClass: 'btn btn-secondary',
};

export class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: {},
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios
            .get('api/projects')
            .then(response => {
                const { data } = response;
                this.setState({ data, loading: false });
            })
            .catch(error => {});
    }

    render() {
        return (
            <React.Fragment>
                {this.state.loading ? <div>Loading ... </div> : <ProjectItems data={this.state.data} />}
                <ModalConfig config={MODAL_CONFIG} content={<AddProject />} />
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Projects);
