import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import './Navbar.css';

class Navbar extends Component {
    onLogoutClick(e) {
        this.props.logoutUser();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link onClick={this.onLogoutClick.bind(this)} className="nav-link" to="/">
                        <img
                            className="rounded-circle"
                            src={user.avatar}
                            alt={user.name}
                            title="You must have a Gravatar connected to your email to display an image"
                        />
                        Log out
                    </Link>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        StudentConnect
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            {isAuthenticated && (
                                <Link className="nav-link" to="/profile">
                                    Profil
                                </Link>
                            )}
                            {isAuthenticated && (
                                <Link className="nav-link" to="/quiz">
                                    Examene
                                </Link>
                            )}
                            {isAuthenticated && (
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="*"
                                        id="navbarDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        Servicii
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/upload-file">
                                            Încarcă fișiere
                                        </Link>
                                        <Link className="dropdown-item" to="/learning">
                                            Grupuri
                                        </Link>
                                        <Link className="dropdown-item" to="/events">
                                            Evenimente
                                        </Link>
                                        <Link className="dropdown-item" to="/create-quiz">
                                            Creează model examen
                                        </Link>
                                    </div>
                                </li>
                            )}
                            )}
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
