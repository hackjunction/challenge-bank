import React, { Component } from 'react';
import * as UserActions from '../../actions/user';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import API from '../../services/api';

class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            secret: '',
            error: ''
        };

        this.onLogin = this.onLogin.bind(this);
        this.onSignup = this.onSignup.bind(this);
    }

    componentWillMount() {
        this.props.clearUser();
    }

    async onLogin(e) {
        e.preventDefault();

        API.userLogin(this.state.username, this.state.password)
            .then(user => {
                console.log('USER', user);
                this.props.updateUser(user);
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: 'Invalid username or password'
                });
                console.log('ERROR', error);
            });
    }

    async onSignup(e) {
        e.preventDefault();

        this.setState({
            loading: true
        });

        API.userSignup(this.state.username, this.state.password, this.state.secret)
            .then(user => {
                console.log('USER', user);
                this.props.updateUser(user);
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: 'Invalid secret code - are you sure you typed it correctly?'
                });
            });
    }

    render() {
        console.log(this.props.user);
        if (this.props.user) {
            if (this.props.location && this.props.location.state) {
                if (this.props.location.state.hasOwnProperty('onSuccess')) {
                    return <Redirect to={{ pathname: this.props.location.state.onSuccess }} />;
                }
            }
            return <Redirect to={{ pathname: '/challenges' }} />;
        }

        return (
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-2 col-lg-4">
                <h3>Log in / Register</h3>
                <form>
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
                        placeholder="Set a password"
                        onChange={event => this.setState({ password: event.target.value })}
                        value={this.state.password}
                    />
                    <input
                        type="text"
                        className="form-control"
                        name="secret"
                        placeholder="The secret code for your event"
                        onChange={event => this.setState({ secret: event.target.value })}
                        value={this.state.secret}
                    />
                    <div className="pull-right">
                        <button type="submit" className="btn btn-default" onClick={this.onLogin}>
                            Login
                        </button>
                        <button type="submit" className="btn btn-info" onClick={this.onSignup}>
                            Sign up
                        </button>
                    </div>
                </form>
                {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    updateUser: user => dispatch(UserActions.updateUser(user)),
    clearUser: user => dispatch(UserActions.clearUser(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserLogin);
