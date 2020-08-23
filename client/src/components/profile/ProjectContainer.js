import React, { Component } from 'react';
import axios from 'axios';
import { ModalConfig } from './ModalConfig';
import { EditProject } from './EditProject';
import _ from 'lodash';
import { handleErrors } from '../../utils/handleErrors';
import './profile.css';
import Moment from 'react-moment';
let MODAL_CONFIG = {
    title: 'Editare proiect',
    buttonClass: 'editButton',
    buttonLabel: '\u270E',
    content: '',
};

export class ProjectContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    handleClick = () => {
        this.setState((state) => ({
            expanded: !state.expanded,
        }));
    };

    deleteProject = (e, id) => {
        e.preventDefault();
        window.confirm('Are you sure?') &&
            axios
                .delete('/api/projects/' + id)
                .then((response) => {
                    const { status } = response;
                    if (status === 200) {
                        window.alert('Proiect șters cu succes!');
                        window.location.reload(true);
                    }
                })
                .catch((error) => {
                    handleErrors(error.response.data);
                });
    };

    renderProjectDetails = (data) => {
        return (
            <ul>
                {data.map((item, index) => {
                    return <li key={index}>{item}</li>;
                })}
            </ul>
        );
    };

    renderAdditionalInfo = (project) => {
        const { createdAt, createdBy, members, technologyStack } = project;
        return this.state.expanded ? (
            <React.Fragment>
                <div className="project-additional-data">
                    <div className="row">
                        <div className="col">
                            <div className="project-additional-data-heading">Date generale</div>
                            <div className="project-addition-data-content">
                                {' '}
                                <li>Creat de: {createdBy}</li>
                                <li>
                                    Creat la: <Moment format="DD.MM.YYYY">{createdAt}</Moment>
                                </li>
                            </div>
                        </div>
                        <div className="col">
                            <div className="project-additional-data-heading">Tehnologii folosite</div>{' '}
                            <div className="project-additional-data-content"> {!_.isEmpty(technologyStack) && this.renderProjectDetails(technologyStack)}</div>
                        </div>

                        {!_.isEmpty(members) && (
                            <div className="col">
                                <div className="project-additional-data-heading">Membri</div>
                                <div className="project-addition-data-content"> {this.renderProjectDetails(members)} </div>
                            </div>
                        )}
                    </div>
                </div>
            </React.Fragment>
        ) : null;
    };

    renderContent = () => {
        const { _id, name } = this.props.data;
        return (
            <div className="project-container">
                <h4 onClick={this.handleClick} className={this.state.expanded ? 'pointer-active' : 'pointer'}>
                    {name}
                </h4>
                <div className="edit-delete-icons">
                    <button className="deleteButton" onClick={(e) => this.deleteProject(e, _id)}>
                        &#10006;
                    </button>
                    <ModalConfig config={MODAL_CONFIG} content={<EditProject data={this.props.data} />} />
                </div>
                {this.renderAdditionalInfo(this.props.data)}
                <hr />
            </div>
        );
    };

    render() {
        return this.renderContent();
    }
}
