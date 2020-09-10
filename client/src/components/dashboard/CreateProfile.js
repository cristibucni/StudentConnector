import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            handle: '',
            location: '',
            skills: [],
            university: '',
            faculty: '',
            website: '',
            bio: '',
            social: {
                facebook: '',
                instagram: '',
                linkedin: '',
            },
            canSend: false,
        };
    }

    componentDidMount() {
        const user = this.props.userId;
        this.setState({ user: user, handle: user });
        axios
            .get('api/profile')
            .then((response) => {
                this.setState({ loading: false, hasProfile: true });
            })
            .catch((error) => {
                const errorsArray = [];
                Object.keys(error.response.data).forEach((key) => {
                    const keyValuePair = {
                        error: error.response.data[key],
                    };

                    errorsArray.push(keyValuePair);
                });

                this.setState({
                    errors: errorsArray,
                    loading: false,
                });
            });
    }

    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            if (this.state.location !== '' && !_.isEmpty(this.state.skills) && this.state.university !== '' && this.state.faculty !== '') {
                this.setState({ canSend: true });
            }
        });
    };

    handleOnSkillChange = (e) => {
        this.setState({ skills: e.target.value.split(',') }, () => {
            if (this.state.location !== '' && !_.isEmpty(this.state.skills) && this.state.university !== '' && this.state.faculty !== '') {
                this.setState({ canSend: true });
            }
        });
    };

    handleSubmit = () => {
        const data = {
            user: this.state.user,
            handle: this.state.handle,
            location: this.state.location,
            skills: this.state.skills,
            university: this.state.university,
            faculty: this.state.faculty,
            website: this.state.website,
            bio: this.state.bio,
            social: {
                facebook: this.state.social.facebook,
                instagram: this.state.social.instagram,
                linkedin: this.state.social.linkedin,
            },
        };
        axios
            .post('/api/profile/', data)
            .then((result) => {
                window.location.reload();
            })
            .catch(function (error) {});
    };

    render() {
        return (
            <div className="dashboard-container">
                {' '}
                <div className="question-container">
                    <li className="question-title">Descriere personală</li>
                    <TextField fullWidth id="standard-basic" label="Bio" onChange={(e) => this.handleOnChange(e)} name="bio" placeholder="" />
                </div>
                <div className="question-container">
                    <li className="question-title">Site personal</li>
                    <TextField id="standard-basic" label="Website" onChange={(e) => this.handleOnChange(e)} name="website" placeholder="" />
                </div>
                <div className="question-container">
                    <li className="question-title">Locație</li>
                    <TextField id="standard-basic" label="Locatie" onChange={(e) => this.handleOnChange(e)} name="location" placeholder="" />
                </div>
                <div className="question-container">
                    <li className="question-title">Universitate</li>
                    <TextField id="standard-basic" label="Universitate" onChange={(e) => this.handleOnChange(e)} name="university" placeholder="" />
                </div>
                <div className="question-container">
                    <li className="question-title">Facultate</li>
                    <TextField id="standard-basic" label="Facultate" onChange={(e) => this.handleOnChange(e)} name="faculty" placeholder="" />
                </div>
                <div className="question-container">
                    <li className="question-title">Aptitudini</li>
                    <TextField id="standard-basic" label="Aptitudini" onChange={(e) => this.handleOnChange(e)} name="skills" placeholder="" />
                </div>
                <div className="row">
                    <div className="col">
                        <div className="question-container">
                            <li className="question-title">Facebook</li>
                            <TextField id="standard-basic" label="Aptitudini" onChange={(e) => this.handleOnChange(e)} name="skills" placeholder="" />
                            <input type="text" onChange={(e) => this.handleOnChange(e)} name="skills" placeholder="" className="question-user-input-answer" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="question-container">
                            <li className="question-title">Instagram</li>
                            <input type="text" onChange={(e) => this.handleOnChange(e)} name="skills" placeholder="" className="question-user-input-answer" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="question-container">
                            <li className="question-title">LinkedIn</li>
                            <input type="text" onChange={(e) => this.handleOnChange(e)} name="skills" placeholder="" className="question-user-input-answer" />
                        </div>
                    </div>
                </div>
                {this.state.canSend && (
                    <div className="quiz-container-page-controls">
                        <button className="quiz-container-action-button" onClick={this.handleSubmit}>
                            Trimite
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default CreateProfile;
