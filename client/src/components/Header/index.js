import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import './style.css';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: null
        };
    }

    // componentWillMount() {
    //     if (this.props.user) {
    //         this.updateEvent(this.props.user.event);
    //     }
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (!nextProps.user) {
    //         this.setState({
    //             event: null
    //         });
    //     } else {
    //         if (nextProps.user !== this.props.user) {
    //             this.updateEvent(nextProps.user.event);
    //         }
    //     }
    // }

    // updateEvent(eventId) {
    //     console.log('Updating event');
    //     API.getEvent(eventId)
    //         .then(event => {
    //             this.setState({
    //                 event
    //             });
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 event: null
    //             });
    //         });
    // }

    render() {
        const props = this.props;
        return (
            <div className="header">
                <div className="junctionlogo" />
                <div className="row userdata">
                    {props.user && props.user.username ? (
                        <React.Fragment>
                            <p className="Header--logged-in-as">Logged in as: {props.user.username}</p>
                            <Link className="Header--login" to="/login">
                                Log out
                            </Link>
                        </React.Fragment>
                    ) : (
                        <Link className="Header--login" to="/login">
                            Log in
                        </Link>
                    )}
                </div>
                <div className="container">
                    <div className="row">
                        <div className="header-content">
                            <Link to={`/`}>
                                <h2>CHALLENGE BANK</h2>
                            </Link>
                            <h5 className="header-event-name">{'TechRace Helsinki'}</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

export default connect(mapStateToProps)(Header);
