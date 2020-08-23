import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Student Connector</h1>
                                <p className="lead">
                                    Îmbunătățeste-ți obiceiurile! Devino parte a comunității Student Connector și nu vei mai întârzia niciodată.
                                </p>
                                <hr />
                                <Link className="btn btn-lg btn-info mr-2" to="/register">
                                    Înregistrare
                                </Link>
                                <Link className="btn btn-lg btn-light" to="/login">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Landing);
