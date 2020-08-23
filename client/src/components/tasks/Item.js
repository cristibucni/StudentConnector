import React, { Component } from 'react';
import './Tasks.css';
import Moment from 'react-moment';
class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            name: this.props.data.name,
            itemDone: this.props.checked,
            _id: this.props.data._id,
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="quizes-list-header" key={this.props.data._id}>
                    <button onClick={() => this.props.onDelete(this.props.data._id)} className="delete-category-button">
                        &#10006;
                    </button>
                    <div>Materie: {this.props.data.name}</div>

                    <div>
                        Dată: <Moment format="DD-MM-YYYY">{this.props.data.deadline}</Moment>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Item;
