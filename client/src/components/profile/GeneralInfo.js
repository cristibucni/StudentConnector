import React, { Component } from 'react';
import axios from 'axios';
import './profile.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { css } from '@emotion/core';
import { FadeLoader } from 'react-spinners';
import { ProjectItems } from './ProjectItems';
import { AddProject } from './AddProject';
import { ModalConfig } from './ModalConfig';
const override = css`
    display: block;
    margin: auto;
    margin-top: 20%;
    border-color: #03728b;
`;
const MODAL_CONFIG = {
    id: 'addProjects',
    title: 'Adaugă proiect',
    buttonLabel: '\u271A',
    buttonClass: 'btn btn-secondary',
};
class GeneralInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loading: true,
            errors: [],
            projects: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true, user: this.props.auth.user });
        axios.get('api/users/current').then((response) => {
            this.setState({ user: response.data });
            axios
                .get('api/profile')
                .then((response) => {
                    const { data } = response;
                    this.setState({ data });
                    axios
                        .get('api/projects')
                        .then((response) => {
                            const { data } = response;
                            this.setState({ projects: data, loading: false });
                        })
                        .catch((error) => {});
                })
                .catch((error) => {
                    const errorsArray = [];
                    Object.keys(error.response.data).forEach((key) => {
                        const keyValuePair = {
                            error: error.response.data[key],
                        };

                        errorsArray.push(keyValuePair);
                    });

                    this.setState({
                        errors: errorsArray,
                        loading: false,
                    });
                });
        });
    }

    renderErrors = () => {
        return (
            <React.Fragment>
                {this.state.errors.map((item, index) => {
                    return <div key={index}>{item.error}</div>;
                })}
            </React.Fragment>
        );
    };

    renderSkills = (data) => {
        return (
            <ul className="profile-skills-ul">
                {data.map((item, index) => {
                    return (
                        <li key={index} className="profile-skill">
                            {item}
                        </li>
                    );
                })}
            </ul>
        );
    };

    renderContent = () => {
        const { bio, location, university, faculty, skills } = this.state.data;
        return this.state.errors.length > 0 ? (
            this.renderErrors()
        ) : (
            <div className="row-schedule">
                <div className="row">
                    <div className="col-md-2">
                        <img className="profile-avatar" src={this.state.user.avatar} />
                    </div>
                    <div className="col-md-6">
                        <div>
                            <h1 className="profile-user-name">{this.state.user.name}</h1>
                        </div>
                        <h5 className="profile-user-job">Student</h5>
                        <h5 className="profile-user-job"> {this.state.user.isAdmin && 'Administrator'}</h5>
                    </div>
                    <div className="col-md-4 ">
                        <div className="row">
                            <div className="col-md-10 profile-right-widget"> {location}</div>
                            <div className="col-md-2 profile-right-icons">
                                {' '}
                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div>
                            <div className="row">
                                <div className="col-md-10 profile-right-widget"> {this.state.user.email} </div>
                                <div className="col-md-2 profile-right-icons">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-description">{bio}</div>
                <div className="row">
                    <div className="col">
                        <div className="profile-heading">Proiecte</div>
                        <ProjectItems data={this.state.projects} />
                        <ModalConfig config={MODAL_CONFIG} content={<AddProject />} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="profile-heading">Educație</div>
                        <div className="profile-education">
                            <h3>{faculty}</h3>
                            <h5>{university}</h5>
                        </div>
                    </div>
                    <div className="col">
                        <div className="profile-heading">Aptitudini</div> <div>{this.renderSkills(skills)}</div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        console.log(this.state.user);
        return this.state.loading ? (
            <div className="sweet-loading">
                <FadeLoader css={override} sizeUnit={'px'} size={150} color={'#03728b'} loading={this.state.loading} />
            </div>
        ) : (
            this.renderContent()
        );
    }
}

GeneralInfo.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(GeneralInfo);
