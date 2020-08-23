import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import axios from 'axios';
import CreateProfile from './CreateProfile';
import Schedule from './Schedule';
import './Dashboard.css';
import { FadeLoader } from 'react-spinners';
import { css } from '@emotion/core';
import Tasks from '../tasks/Tasks';
import _ from 'lodash';
const override = css`
    display: block;
    margin: auto;
    margin-top: 20%;
    border-color: #03728b;
`;
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            hasProfile: false,
        };
    }

    componentDidMount() {
        const { user } = this.props.auth;
        this.setState({ user: user.id, handle: user.id });
        axios
            .get('api/profile')
            .then((response) => {
                this.setState({ hasProfile: true });
                axios
                    .get('/api/users/current/tasks')
                    .then((response) => {
                        const tasksArray = response.data.tasks;
                        this.setState({
                            tasksArray,
                        });
                        axios.get('/api/subjects').then((response) => {
                            const subjects = response.data;
                            this.setState({
                                subjects,
                            });
                            axios
                                .get('api/users/current')
                                .then((response) => {
                                    this.setState({ user: response.data, loading: false }, () => {
                                        if (
                                            !_.isEmpty(this.state.user.schedule.luni) ||
                                            !_.isEmpty(this.state.user.schedule.marti) ||
                                            !_.isEmpty(this.state.user.schedule.miercuri) ||
                                            !_.isEmpty(this.state.user.schedule.joi) ||
                                            !_.isEmpty(this.state.user.schedule.vineri)
                                        ) {
                                            this.setState({ hasSchedule: true, schedule: this.state.user.schedule });
                                        }
                                    });
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
    }

    render() {
        return this.state.loading ? (
            <div className="sweet-loading">
                <FadeLoader css={override} sizeUnit={'px'} size={150} color={'#03728b'} loading={this.state.loading} />
            </div>
        ) : this.state.hasProfile ? (
            <React.Fragment>
                <Schedule userId={this.state.user} hasSchedule={this.state.hasSchedule} schedule={this.state.schedule} user={this.state.user} />
                <Tasks subjects={this.state.subjects} tasksArray={this.state.tasksArray} />
            </React.Fragment>
        ) : (
            <CreateProfile userId={this.state.user} handle={this.state.user} />
        );
    }
}
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Dashboard);
