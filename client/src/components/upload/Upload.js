import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { FadeLoader } from 'react-spinners';
import { css } from '@emotion/core';
const override = css`
    display: block;
    margin: auto;
    margin-top: 5%;
    border-color: #03728b;
`;
class Upload extends Component {
    constructor() {
        super();
        this.state = {
            description: '',
            selectedFile: '',
            data: {},
            loading: true,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.refreshList();
    }

    onChange = (e) => {
        switch (e.target.name) {
            case 'selectedFile':
                this.setState({ selectedFile: e.target.files[0] });
                break;
            default:
                this.setState({ [e.target.name]: e.target.value });
        }
    };

    refreshList = () => {
        axios
            .get('api/uploads')
            .then((response) => {
                const { data } = response;
                this.setState({ data: data.reverse(), loading: false, selectedFile: '' });
            })
            .catch((error) => {});
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { user } = this.props.auth;
        const userId = user.id;
        const { selectedFile } = this.state;
        let formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('owner', userId);
        axios
            .post('/api/uploads/', formData, { userId })
            .then((result) => {
                this.refreshList();
            })
            .catch(function (error) {});
    };

    renderFiles = () => {
        return this.state.loading ? (
            <div className="sweet-loading">
                <FadeLoader css={override} sizeUnit={'px'} size={150} color={'#03728b'} loading={this.state.loading} />
            </div>
        ) : (
            this.state.data.map((file, index) => {
                return (
                    <div className="quiz-list-item" key={index}>
                        <div className="row quiz-list-item-row">
                            <div className="col">
                                <div className="quiz-list-item-container">
                                    <a href={'http://localhost:5000/' + file.url}>
                                        <span className="quiz-list-item-title">{file.name}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
        );
    };

    render() {
        return (
            <React.Fragment>
                <div className="quizes-list-container">
                    <div className="quizes-list-header">Fișiere încărcate</div>
                    <div className="quizes-list-content">{this.renderFiles()}</div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <input type="file" name="selectedFile" onChange={this.onChange} />
                    <button type="submit" className="btn btn-primary btn-sm ">
                        Submit
                    </button>
                </form>
            </React.Fragment>
        );
    }
}

Upload.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Upload);
