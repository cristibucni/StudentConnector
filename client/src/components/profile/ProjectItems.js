import React, {Component} from 'react';
import {ProjectContainer} from './ProjectContainer';
import './profile.css';

export class ProjectItems extends Component {
    render() {
        const itemsList = this.props.data.map((item, index) => <ProjectContainer data={item} key={index} />);
        return <div className="projects-container">{itemsList}</div>;
    }
}
