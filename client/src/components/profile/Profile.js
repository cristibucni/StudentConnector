import React, { Component } from 'react';
import { Projects } from './Projects';
import GeneralInfo from './GeneralInfo';
import { Tabs } from './Tabs';
import './profile.css';

const TABS_CONFIG = [
    {
        id: 'generalInfo',
        title: 'Informații generale',
        content: <GeneralInfo />,
    },
    {
        id: 'projects',
        title: 'Proiecte',
        content: <Projects />,
    },
];

export class Profile extends Component {
    render() {
        return <GeneralInfo />;
    }
}
