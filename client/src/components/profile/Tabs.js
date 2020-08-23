import React, {Component} from 'react';
import './profile.css';

export class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTabID: props.config[0].id,
        };
    }

    handleClick = e => {
        this.setState({
            selectedTabID: e.target.id,
        });
    };

    renderButtons = () => {
        return this.props.config.map(item => {
            return (
                <div className="col-md-auto" key={item.title}>
                    <button id={item.id} className={item.id === this.state.selectedTabID ? 'nav-button-active' : 'nav-button'} onClick={this.handleClick}>
                        {item.title}
                    </button>
                </div>
            );
        });
    };

    renderContent = () => {
        const selectedObject = this.props.config.find(current => {
            return current.id === this.state.selectedTabID;
        });
        return selectedObject.content;
    };

    render() {
        return (
            <React.Fragment>
                <div className="row">{this.renderButtons()}</div>
                <div className="profile-content">{this.renderContent()}</div>
            </React.Fragment>
        );
    }
}
