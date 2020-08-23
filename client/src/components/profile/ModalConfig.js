import React, { Component } from 'react';
import Modal from 'react-modal';
import './profile.css';

const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        minWidth: '420px',
    },
};

export class ModalConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: this.props.modalIsOpen,
        };
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    render() {
        const { buttonClass, buttonLabel, title } = this.props.config;
        return (
            <React.Fragment>
                <button onClick={this.openModal} className={buttonClass}>
                    {buttonLabel}
                </button>
                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal" ariaHideApp={false}>
                    <div className="modal-heading">
                        <span className="modal-title-span">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                {title}
                            </h5>
                        </span>
                        <button onClick={this.closeModal} className="close" aria-label="Close">
                            &#10006;
                        </button>
                        <hr />
                    </div>
                    <div className="modal-content">{this.props.content}</div>
                </Modal>
            </React.Fragment>
        );
    }
}
