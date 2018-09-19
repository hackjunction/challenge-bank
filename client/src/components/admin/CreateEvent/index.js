import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import { Form, Input, Checkbox } from 'formsy-react-components';
import { connect } from 'react-redux';
import API from '../../../services/api';
import { Link } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';

import './style.css';

class CreateEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: false,
            submitted: false,
            loading: false,
            timezone: null,
            eventData: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(params) {
        this.setState({
            loading: true
        });

        const { username, password } = this.props.admin.credentials;

        API.adminCreateEvent(username, password, { event: params })
            .then(event => {
                this.setState({
                    loading: false,
                    submitted: true
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    submitted: false,
                    error: 'Oops, something went wrong'
                });
            });
    }

    onValidChange(isValid) {
        this.setState({
            valid: isValid
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="CreateEvent--loading container">
                    <h3>Creating event</h3>
                    <Spinner name="circle" />
                </div>
            );
        }

        if (this.state.submitted) {
            return (
                <div className="CreateEvent--container container">
                    <h1 className="CreateEvent--title">Create a new event</h1>
                    <div className="alert alert-success" role="alert">
                        Event created!
                    </div>
                    <Link to="/admin">Back to events list</Link>
                </div>
            );
        }

        return (
            <div className="CreateEvent--container container">
                <h1 className="CreateEvent--title">Create a new event</h1>
                {this.state.error ? (
                    <div className="alert alert-danger" role="alert">
                        {this.state.error}
                    </div>
                ) : null}
                {!this.state.valid ? (
                    <div className="alert alert-warning" role="alert">
                        Please fill all required fields (marked with *)
                    </div>
                ) : null}
                <Form
                    className="form-horizontal col-xs-12"
                    onValidSubmit={this.onSubmit}
                    onValid={() => this.onValidChange(true)}
                    onInvalid={() => this.onValidChange(false)}
                >
                    <Input
                        name="eventName"
                        label="Name of the event"
                        placeholder="TechRace Espoo"
                        value={this.state.eventData.eventName}
                        onChange={(key, value) =>
                            this.setState({ eventData: { ...this.state.eventData, [key]: value } })
                        }
                        type="text"
                        required
                    />
                    <Input
                        name="locationName"
                        label="Where is the event?"
                        placeholder="Startup Sauna"
                        value={this.state.eventData.locationName}
                        onChange={(key, value) =>
                            this.setState({ eventData: { ...this.state.eventData, [key]: value } })
                        }
                        type="text"
                        required
                    />
                    <Input
                        name="locationAddress"
                        label="Address of the event"
                        placeholder="Betonimiehenkuja 3D, 02150 Espoo"
                        value={this.state.eventData.locationAddress}
                        onChange={(key, value) =>
                            this.setState({ eventData: { ...this.state.eventData, [key]: value } })
                        }
                        type="text"
                        required
                    />
                    <Input
                        name="eventStartTime"
                        label="When does the event begin?"
                        value={this.state.eventData.eventStartTime}
                        onChange={(key, value) =>
                            this.setState({ eventData: { ...this.state.eventData, [key]: value } })
                        }
                        type="datetime-local"
                        required
                    />
                    <Input
                        name="eventEndTime"
                        label="When does the event end?"
                        value={this.state.eventData.eventEndTime}
                        onChange={(key, value) =>
                            this.setState({ eventData: { ...this.state.eventData, [key]: value } })
                        }
                        type="datetime-local"
                        required
                    />
                    <Input
                        name="platformOpens"
                        label="Submissions open"
                        value={this.state.eventData.platformOpens}
                        onChange={(key, value) =>
                            this.setState({ eventData: { ...this.state.eventData, [key]: value } })
                        }
                        type="datetime-local"
                        required
                    />
                    <Input
                        name="platformCloses"
                        label="Submissions close"
                        value={this.state.eventData.platformCloses}
                        onChange={(key, value) =>
                            this.setState({ eventData: { ...this.state.eventData, [key]: value } })
                        }
                        type="datetime-local"
                        required
                    />
                    <Input name="timezone" value={this.state.eventData.timezone} type="hidden" required />
                    <div class="form-group row">
                        <label class="control-label col-sm-3" data-required="true" for="timezone">
                            Timezone
                            <span class="required-symbol"> *</span>
                        </label>
                        <div class="col-sm-9">
                            <TimezonePicker
                                name="timezone"
                                label="Select Timezone"
                                className="CreateEvent--timezone"
                                absolute={true}
                                placeholder="Select timezone..."
                                onChange={timezone =>
                                    this.setState({ eventData: { ...this.state.eventData, timezone } })
                                }
                                id="timezone"
                            />
                        </div>
                    </div>
                    <Input
                        name="secretCode"
                        label="Secret code for the event"
                        value={this.state.eventData.secretCode}
                        onChange={(key, value) =>
                            this.setState({ eventData: { ...this.state.eventData, [key]: value } })
                        }
                        type="text"
                        required
                    />
                    <Input
                        name="participantCount"
                        label="Number of participants"
                        value={this.state.eventData.participantCount}
                        onChange={(key, value) =>
                            this.setState({ eventData: { ...this.state.eventData, [key]: value } })
                        }
                        type="number"
                        placeholder="Amount of participants (you can edit this later)"
                        required
                    />
                    <Input name="isTechRace" value={this.state.eventData.isTechRace} type="hidden" required />
                    <div class="form-group row">
                        <label class="control-label col-sm-3" data-required="true" for="timezone">
                            This is a TechRace event
                            <span class="required-symbol"> *</span>
                        </label>
                        <div class="col-sm-9">
                            <Switch
                                checked={this.state.eventData.isTechRace}
                                value={this.state.eventData.isTechRace}
                                onChange={event =>
                                    this.setState({
                                        eventData: { ...this.state.eventData, isTechRace: event.target.checked }
                                    })
                                }
                                color="primary"
                            />
                        </div>
                    </div>
                    <button
                        className={this.state.valid ? 'pull-right btn btn-primary' : 'pull-right btn btn-light'}
                        type="submit"
                        disabled={!this.state.valid}
                    >
                        Create Event
                    </button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    admin: state.admin
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateEvent);
