import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import { Footer } from '../components/FooterComponent';
import { Header } from '../components/HeaderComponent';
import '../styles/globals.scss';

function PocketToEvernote({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <div className="container-md mx-auto">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <Header {...pageProps} />
                    <Component {...pageProps} />
                    <Footer {...pageProps} className="mt-5"/>
                </div>
            </div>
        </div>
    );
}

export default PocketToEvernote;
