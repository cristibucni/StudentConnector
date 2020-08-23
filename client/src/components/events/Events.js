import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import Modal from 'react-responsive-modal';
import { FadeLoader } from 'react-spinners';
import { css } from '@emotion/core';
import Moment from 'react-moment';
import { AddEvent } from './AddEvent';

const override = css`
    display: block;
    margin: auto;
    margin-top: 20%;
    border-color: #03728b;
`;

const locatii = {
    FACULTATE: 'Facultate',
    SALA_LECTURA: 'Sală de lectură - Cămin Leu A',
    CANTINA: 'Cantină Leu',
};

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            openModal: false,
            events: [],
        };
    }

    componentDidMount() {
        axios
            .get('api/events')
            .then((response) => {
                const { data } = response;
                this.setState({ events: data, loading: false });
            })
            .catch((error) => {});
    }

    openModal = (e) => {
        e.preventDefault();
        this.setState({ openModal: true });
    };

    closeModal = () => {
        this.setState({ openModal: false });
    };

    renderModal = () => {
        return (
            <Modal open={this.state.openModal} onClose={this.closeModal} center>
                <AddEvent onSubmit={this.onEventSubmit} />
            </Modal>
        );
    };

    onEventSubmit = (data) => {
        axios
            .post('api/events/add', data)
            .then((response) => {
                const newEvents = this.state.events;
                newEvents.push(response.data);
                this.setState({ events: newEvents }, () => {
                    this.closeModal();
                });
            })
            .catch((error) => {});
    };

    onDelete = (id) => {
        axios
            .delete('api/events/' + id)
            .then((response) => {
                window.alert('Ai șters evenimentul');
                window.location.reload(true);
            })
            .catch((error) => {});
    };

    renderGroups = (location) => {
        return this.state.events.map((event, index) => {
            if (event.locatie === location) {
                return (
                    <React.Fragment key={index}>
                        <div className="quiz-list-item">
                            <div className="row quiz-list-item-row">
                                <div className="col">
                                    <div className="quiz-list-item-container">
                                        {this.props.auth.user.isAdmin && (
                                            <button onClick={(e) => this.onDelete(event._id)} className="delete-category-button">
                                                &#10006;
                                            </button>
                                        )}
                                        <div>
                                            <strong>Eveniment: </strong>
                                            {event.nume}
                                        </div>
                                        <div>
                                            <strong>Dată: </strong>
                                            <Moment format="DD.MM.YYYY">{event.data}</Moment>
                                        </div>
                                        <div>
                                            <strong>Ora: </strong>
                                            <Moment format="HH:mm">{event.data}</Moment>
                                        </div>

                                        <div>
                                            <strong>Detalii adiționale: </strong>
                                            {event.detalii}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                );
            }
        });
    };
    render() {
        return this.state.loading ? (
            <div className="sweet-loading">
                <FadeLoader css={override} sizeUnit={'px'} size={150} color={'#03728b'} loading={this.state.loading} />
            </div>
        ) : (
            <React.Fragment>
                {' '}
                {this.props.auth.user.isAdmin && (
                    <span name="modal" onClick={(e) => this.openModal(e)} className="add">
                        Adaugă eveniment {'\u271a'}
                    </span>
                )}
                <br />
                <br />
                {this.renderModal()}
                <div className="quizes-list-container">
                    <div className="quizes-list-header">{locatii.FACULTATE}</div>
                    <div className="quizes-list-content">{this.renderGroups(locatii.FACULTATE)}</div>
                </div>
                <div className="quizes-list-container">
                    <div className="quizes-list-header">{locatii.CANTINA}</div>
                    <div className="quizes-list-content">{this.renderGroups(locatii.CANTINA)}</div>
                </div>
                <div className="quizes-list-container">
                    <div className="quizes-list-header">{locatii.SALA_LECTURA}</div>
                    <div className="quizes-list-content">{this.renderGroups(locatii.SALA_LECTURA)}</div>
                </div>
            </React.Fragment>
        );
    }
}

Events.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { loginUser })(Events);
