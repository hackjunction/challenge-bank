import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

//Routes
import Header from './components/Header';
import Challenges from './components/Challenges';
import Challenge from './components/Challenge';
import Lander from './components/Lander';
import NotFound from './components/NotFound';

import UserLogin from './components/auth/UserLogin';
import UserRoute from './components/auth/UserRoute';

import AdminLogin from './components/auth/AdminLogin';
import AdminEventsList from './components/admin/EventsList';
import AdminCreateEvent from './components/admin/CreateEvent';
import AdminEditEvent from './components/admin/EditEvent';
import AdminSubmissionsList from './components/admin/SubmissionsList';
import AdminResults from './components/admin/Results';
import AdminRoute from './components/auth/AdminRoute';

class App extends Component {
    render() {
        const adminAuth = this.props.admin.credentials !== null;
        const userAuth = this.props.user !== null;

        return (
            <Router>
                <div>
                    <Header />
                    <main>
                        <Switch>
                            {/* Public routes */}
                            <Route exact path="/" component={Lander} />
                            <Route exact path="/login" component={UserLogin} />
                            <Route exact path="/admin/login" component={AdminLogin} />

                            {/* Requires participant login */}
                            <UserRoute exact path="/challenges" component={Challenges} isAuthenticated={userAuth} />
                            <UserRoute path="/challenge/:id" component={Challenge} isAuthenticated={userAuth} />

                            {/* Requires admin login */}
                            <AdminRoute
                                exact
                                path="/admin/events/create"
                                component={AdminCreateEvent}
                                isAuthenticated={adminAuth}
                            />
                            <AdminRoute
                                exact
                                path="/admin/events/edit/:id"
                                component={AdminEditEvent}
                                isAuthenticated={adminAuth}
                            />
                            <AdminRoute
                                path="/admin/submissions/:eventId"
                                component={AdminSubmissionsList}
                                isAuthenticated={adminAuth}
                            />
                            <AdminRoute
                                path="/admin/results/:eventId"
                                component={AdminResults}
                                isAuthenticated={adminAuth}
                            />
                            <AdminRoute exact path="/admin/" component={AdminEventsList} isAuthenticated={adminAuth} />
                            {/* Other routes (404, etc...) */}
                            <Route component={NotFound} isAdmin={adminAuth} isUser={userAuth} />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    admin: state.admin,
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
