import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import moment from 'moment';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import { Form, Input } from 'formsy-react-components';
import './style.css';

class EditEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            loadingEventFetch: true,
            loadingEventSave: false,
            eventFetchError: null,
            eventSaveError: null,
            valid: true,
            timezone: null,
            eventData: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.getEvent();
    }

    async getEvent() {
        this.setState({
            loadingEventFetch: true,
            eventFetchError: null
        });

        const response = await fetch(`/api/events/${this.props.match.params.id}`);
        const body = await response.json();

        if (body.status === 'success') {
            const eventData = {
                ...body.data,
                eventStartTime: moment(body.data.eventStartTime).format('YYYY-MM-DDTHH:mm'),
                eventEndTime: moment(body.data.eventEndTime).format('YYYY-MM-DDTHH:mm'),
                platformOpens: moment(body.data.platformOpens).format('YYYY-MM-DDTHH:mm'),
                platformCloses: moment(body.data.platformCloses).format('YYYY-MM-DDTHH:mm')
            };

            this.setState({
                loadingEventFetch: false,
                eventData
            });
        } else {
            this.setState({
                loadingEventFetch: false,
                eventFetchError: body.data
            });
        }
    }

    async onSubmit(params) {
        TODO: this.setState({
            loadingEventSave: true,
            eventSaveError: null
        });

        const response = await fetch(`/api/events/${params._id}`, {
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event: params
            })
        });
        const body = await response.json();
        if (body.status === 'success') {
            this.setState({
                loadingEventSave: false,
                submitted: true
            });
        } else {
            this.setState({
                loadingEventSave: false,
                submitted: false,
                eventSaveError: body.data
            });
        }
    }

    onValidChange(isValid) {
        this.setState({
            valid: isValid
        });
    }

    render() {
        if (this.state.loadingEventFetch) {
            return (
                <div className="CreateEvent--loading container">
                    <h3>Loading event</h3>
                    <Spinner name="circle" />
                </div>
            );
        }

        if (this.state.loadingEventSave) {
            return (
                <div className="CreateEvent--loading container">
                    <h3>Saving event</h3>
                    <Spinner name="circle" />
                </div>
            );
        }

        if (this.state.eventFetchError) {
            return (
                <div className="CreateEvent--container container">
                    <h1 className="CreateEvent--title">Oops, something went wrong</h1>
                    <p className="text-info">{`We were unable to find an event with the id "${
                        this.props.match.params.id
                    }". Are you sure that is the correct id?`}</p>
                </div>
            );
        }

        return (
            <div className="CreateEvent--container container">
                <h1 className="CreateEvent--title">{'Edit event'}</h1>
                {this.state.eventSaveError ? (
                    <div className="alert alert-danger" role="alert">
                        {this.state.error}
                    </div>
                ) : null}
                {!this.state.valid ? (
                    <div className="alert alert-warning" role="alert">
                        Please fill all required fields (marked with *)
                    </div>
                ) : null}
                {this.state.submitted ? (
                    <div className="alert alert-success" role="alert">
                        Changes saved!
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
                    <div className="form-group row">
                        <label className="control-label col-sm-3" data-required="true" htmlFor="timezone">
                            Timezone
                            <span className="required-symbol"> *</span>
                        </label>
                        <div className="col-sm-9">
                            <TimezonePicker
                                name="timezone"
                                label="Select Timezone"
                                className="CreateEvent--timezone"
                                absolute={true}
                                defaultValue={this.state.eventData.timezone}
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
                    <button
                        className={this.state.valid ? 'pull-right btn btn-primary' : 'pull-right btn btn-light'}
                        type="submit"
                        disabled={!this.state.valid}
                    >
                        Save Changes
                    </button>
                </Form>
            </div>
        );
    }
}

export default EditEvent;
