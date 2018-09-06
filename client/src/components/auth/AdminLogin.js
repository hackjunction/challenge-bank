import React, { Component } from 'react';
import * as AdminActions from '../../actions/admin';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import API from '../../services/api';

class AdminLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.props.clearAdminCredentials();
    }

    async onSubmit(e) {
        e.preventDefault();

        API.adminLogin(this.state.username, this.state.password)
            .then(data => {
                this.props.storeAdminCredentials(this.state.username, this.state.password);
            })
            .catch(error => {
                this.setState({
                    error: 'Something went wrong, please try again'
                });
            });
    }

    render() {
        if (this.props.admin.credentials) {
            if (this.props.location && this.props.location.state) {
                if (this.props.location.state.hasOwnProperty('onSuccess')) {
                    return <Redirect to={{ pathname: this.props.location.state.onSuccess }} />;
                }
            }
            return <Redirect to={{ pathname: '/admin/' }} />;
        }

        return (
            <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-2 col-lg-4">
                <h3>Enter admin credentials</h3>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Username"
                        onChange={event => this.setState({ username: event.target.value })}
                        value={this.state.username}
                    />
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        onChange={event => this.setState({ password: event.target.value })}
                        value={this.state.password}
                    />
                    <button type="submit" class="btn btn-default">
                        Login
                    </button>
                </form>
                {this.state.error ? <p class="text-danger">{this.state.error}</p> : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    admin: state.admin
});

const mapDispatchToProps = dispatch => ({
    storeAdminCredentials: (username, password) => dispatch(AdminActions.storeCredentials(username, password)),
    clearAdminCredentials: () => dispatch(AdminActions.clearCredentials())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminLogin);
