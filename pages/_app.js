import '../styles/bootstrap.min.css';
import 'animate.css';
import '../styles/flaticon.css';
import '../styles/fontawesome.min.css';
import '../node_modules/react-modal-video/css/modal-video.min.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import '../styles/style.css';
import {Provider as ReduxProvider} from 'react-redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import Loader from '../components/Shared/Loader'; 
import GoTop from '../components/Shared/GoTop';
import {store} from "../store";

const persistor = persistStore(store);

export default class MyApp extends App {
    // Preloader
    state = {
        loading: true
    };
    componentDidMount() {
        this.timerHandle = setTimeout(() => this.setState({ loading: false }), 2000); 
    }
    componentWillUnmount() {
        if (this.timerHandle) {
            clearTimeout(this.timerHandle);
            this.timerHandle = 0;
        }
    }
    render () {
        const { Component, pageProps } = this.props
        return (
            <>
            <ReduxProvider store={store}>
                {/* <PersistGate loading={null} persistor={persistor}> */}
                    <Head>
                            <meta 
                                name="viewport" 
                                content="width=device-width, initial-scale=1, shrink-to-fit=no" 
                            />
                            <title>Portal301 - Socket Remote Robot</title>
                    </Head>

                    <Component {...pageProps} />
                        
                    {/* Preloader */}
                    <Loader loading={this.state.loading} />

                    {/* Go Top Button */}
                    <GoTop scrollStepInPx="50" delayInMs="10.50" />
                {/* </PersistGate> */}
            </ReduxProvider>
            </>
        );
    }
}