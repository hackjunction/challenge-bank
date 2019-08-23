import React, {Suspense, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import { ConnectedRouter } from 'connected-react-router';
import { connect} from 'react-redux';

import * as ContentActions from 'redux/content/actions';

const App = ({history, updateContent}) => {

    useEffect(() => {
        updateContent();
    }, []);


    return(
        <ConnectedRouter history={history}>
            <Suspense fallback={null}>
                <h1>The app be here</h1>
            </Suspense>
        </ConnectedRouter>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    updateContent: () => dispatch(ContentActions.updateContent())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);