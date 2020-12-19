import React from 'react';
import { BrowserRouter as Router } from "react-router-dom"

import {Provider} from 'react-redux'
import {getReduxStore, getRrfProp} from "./Config/firebase-redux"
import {ReactReduxFirebaseProvider} from "react-redux-firebase"
import './App.css';

import RouterManager from './Layout/RouterManager/RouterManager';
import Footer from './Layout/Homepage/Footer/Footer'
function App() {
    return (
        <div className="App">
          <div className="content-wrap">
          <Provider store={getReduxStore()}>
                <ReactReduxFirebaseProvider {...getRrfProp()}>
                    <Router>
                        <RouterManager />
                    </Router>
                </ReactReduxFirebaseProvider>
            </Provider>
          </div>
            <Footer />
        </div>
    );
}

export default App;