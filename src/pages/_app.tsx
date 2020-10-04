import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import { Header } from '../components/HeaderComponent';
import '../styles/globals.scss';

function PocketToEvernote({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <div className="container-md mx-auto">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <Header {...pageProps} />
                    <Component {...pageProps} />
                </div>
            </div>
        </div>
    );
}

export default PocketToEvernote;
