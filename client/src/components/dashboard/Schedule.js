import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import CreateSchedule from './CreateSchedule';
import { FadeLoader } from 'react-spinners';
import { css } from '@emotion/core';

const override = css`
    display: block;
    margin: auto;
    margin-top: 20%;
    border-color: #03728b;
`;
class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: {},
            hasSchedule: false,
        };
    }

    componentDidMount() {}

    renderDay = (day) => {
        return (
            <React.Fragment>
                <div className="schedule-day">{day}</div>
                <div className="schedule-content">
                    {this.props.schedule[day].map((item, index) => {
                        return (
                            <div key={index} className="schedule-item">
                                <div>{item.name}</div>
                                <div className="schedule-item-time">{item.startTs_endTs}</div>
                            </div>
                        );
                    })}
                </div>
            </React.Fragment>
        );
    };

    sendSchedule = (schedule) => {
        const data = {
            schedule,
            id: this.props.userId,
        };
        axios
            .post('/api/users/schedule', data)
            .then((result) => {
                window.location.reload();
            })
            .catch(function (error) {});
    };

    render() {
        return this.state.loading ? (
            <div className="sweet-loading">
                <FadeLoader css={override} sizeUnit={'px'} size={150} color={'#03728b'} loading={this.state.loading} />
            </div>
        ) : this.props.hasSchedule ? (
            <React.Fragment>
                <div className="quizes-list-header">Orar</div>
                <br />
                <br />
                <div className="row row-schedule justify-content-center">
                    <div className="col-md-2 col-md-offset-1 col-schedule">{this.renderDay('luni')}</div>
                    <div className="col-md-2 col-schedule">{this.renderDay('marti')}</div>
                    <div className="col-md-2 col-schedule">{this.renderDay('miercuri')}</div>
                    <div className="col-md-2 col-schedule">{this.renderDay('joi')}</div>
                    <div className="col-md-2 col-schedule">{this.renderDay('vineri')}</div>
                </div>
            </React.Fragment>
        ) : (
            <CreateSchedule sendSchedule={this.sendSchedule} />
        );
    }
}

Schedule.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { loginUser })(Schedule);
