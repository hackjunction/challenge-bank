import React, { Suspense, useEffect } from 'react';
import './App.css';

import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import ChallengesPage from './pages/Challenges';
import ChallengePage from './pages/Challenge';

import * as ContentActions from 'redux/content/actions';

const App = ({ history, updateContent }) => {
    useEffect(() => {
        updateContent();
    }, []);

    return (
        <ConnectedRouter history={history}>
            <Suspense fallback={null}>
                <Switch>
                    <Route path="/challenges" exact component={ChallengesPage} />
                    <Route path="/challenges/:id" exact component={ChallengePage} />
                    <Redirect to="/challenges" />
                </Switch>
            </Suspense>
        </ConnectedRouter>
    );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    updateContent: () => dispatch(ContentActions.updateContent())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
