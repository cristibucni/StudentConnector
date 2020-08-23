import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import Modal from 'react-responsive-modal';
import { AddGroup } from './AddGroup';

import { FadeLoader } from 'react-spinners';
import { css } from '@emotion/core';

const override = css`
    display: block;
    margin: auto;
    margin-top: 20%;
    border-color: #03728b;
`;
const locatii = {
    CORP_A_LEU_PARTER: 'Corp A Leu - Parter',
    CORP_A_LEU_ETAJ: 'Corp A Leu - Etajul 1',
    SALA_LECTURA: 'Sală de lectură - Cămin Leu A',
    BIBLIOTECA_CENTRALA: 'Biblioteca centrală - Campus UPB',
};

class Learning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            openModal: false,
            groups: [],
        };
    }

    componentDidMount() {
        const { user } = this.props.auth;
        this.setState({ currentUser: user.id });
        axios
            .get('api/groups')
            .then((response) => {
                const { data } = response;
                this.setState({ groups: data, loading: false });
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
                <AddGroup onSubmit={this.onGroupSubmit} />
            </Modal>
        );
    };

    onGroupSubmit = (data) => {
        const newGroup = { ...data, lider: this.state.currentUser };
        axios
            .post('api/groups/add', newGroup)
            .then((response) => {
                const newGroups = this.state.groups;
                newGroups.push(response.data);
                this.setState({ groups: newGroups }, () => {
                    this.closeModal();
                });
            })
            .catch((error) => {});
    };

    onDelete = (id) => {
        axios
            .delete('api/groups/' + id)
            .then((response) => {
                window.alert('Ai șters grupul');
                window.location.reload(true);
            })
            .catch((error) => {});
    };

    renderGroups = (location) => {
        return this.state.groups.map((group, index) => {
            if (group.locatie === location) {
                return (
                    <React.Fragment key={index}>
                        <div className="quiz-list-item">
                            <div className="row quiz-list-item-row">
                                <div className="col">
                                    <div className="quiz-list-item-container">
                                        {group.lider === this.state.currentUser && (
                                            <button onClick={(e) => this.onDelete(group._id)} className="delete-category-button">
                                                &#10006;
                                            </button>
                                        )}
                                        <div>
                                            <strong>Materie: </strong>
                                            {group.nume}
                                        </div>
                                        <div>
                                            <strong>Cadru didactic: </strong>
                                            {group.profesor}
                                        </div>
                                        <div>
                                            <strong>Detalii adiționale: </strong>
                                            {group.detalii}
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
                <span name="modal" onClick={(e) => this.openModal(e)} className="add">
                    Adaugă grup {'\u271a'}
                </span>
                {this.renderModal()}
                <div className="row">
                    <div className="col">
                        <div className="quizes-list-container">
                            <div className="quizes-list-header">{locatii.SALA_LECTURA}</div>
                            <div className="quizes-list-content">{this.renderGroups(locatii.SALA_LECTURA)}</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="quizes-list-container">
                            <div className="quizes-list-header">{locatii.BIBLIOTECA_CENTRALA}</div>
                            <div className="quizes-list-content">{this.renderGroups(locatii.BIBLIOTECA_CENTRALA)}</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="quizes-list-container">
                            <div className="quizes-list-header">{locatii.CORP_A_LEU_PARTER}</div>
                            <div className="quizes-list-content">{this.renderGroups(locatii.CORP_A_LEU_PARTER)}</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="quizes-list-container">
                            <div className="quizes-list-header">{locatii.CORP_A_LEU_ETAJ}</div>
                            <div className="quizes-list-content">{this.renderGroups(locatii.CORP_A_LEU_ETAJ)}</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Learning.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { loginUser })(Learning);
